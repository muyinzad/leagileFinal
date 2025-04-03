import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { name?: string; avatar_url?: string }) => Promise<{
    error: any | null;
    data: any | null;
  }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }

      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Sign up a new user
  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log("Attempting to sign up with:", { email, name });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      console.log("Sign up response:", {
        data: data
          ? { user: data.user ? { id: data.user.id } : "null" }
          : "null",
        error,
      });

      if (error) {
        console.error("Error during sign up:", error);
        return { error, data: null };
      }

      // Check if data is null or undefined
      if (!data) {
        console.error("Sign up response data is null or undefined");
        return {
          error: {
            message: "Failed to create user account. Please try again.",
          },
          data: null,
        };
      }

      // Check if data.user is null or undefined
      if (!data.user) {
        console.error("Sign up response data.user is null or undefined");
        return {
          error: {
            message:
              "User account created but user data is missing. Please try logging in.",
          },
          data,
        };
      }

      // Create a profile entry in the profiles table
      try {
        // Ensure we have a valid user ID before attempting to create a profile
        if (data.user.id) {
          console.log("Creating profile for user ID:", data.user.id);

          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: data.user.id,
                name,
                email,
              },
            ]);

          if (profileError) {
            console.error("Error creating profile:", profileError);
            // Continue with sign up even if profile creation fails
            // We can handle profile creation later
          } else {
            console.log("Profile created successfully");
          }
        } else {
          console.error("Cannot create profile: User ID is missing");
        }
      } catch (profileError) {
        console.error("Exception creating profile:", profileError);
        // Continue with sign up even if profile creation fails
      }

      return { data, error: null };
    } catch (error) {
      console.error("Exception during sign up:", error);
      return {
        error: { message: "An unexpected error occurred during sign up." },
        data: null,
      };
    }
  };

  // Sign in a user
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Sign in response:", {
        data: data ? { session: data.session ? "exists" : "null" } : "null",
        error,
      });

      if (error) {
        console.error("Error during sign in:", error);
        return { error, data: null };
      }

      // Check if data is null or undefined
      if (!data) {
        console.error("Sign in response data is null or undefined");
        return {
          error: { message: "Failed to sign in. Please try again." },
          data: null,
        };
      }

      if (data.session) {
        console.log("Sign in successful, navigating to dashboard");
        navigate("/dashboard");
      } else {
        console.error("Sign in response data.session is null or undefined");
        return {
          error: {
            message: "Authentication session could not be established.",
          },
          data,
        };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Exception during sign in:", error);
      return { error, data: null };
    }
  };

  // Sign out a user
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  // Update user profile
  const updateProfile = async (data: {
    name?: string;
    avatar_url?: string;
  }) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Update auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          avatar_url: data.avatar_url,
        },
      });

      if (updateError) {
        return { error: updateError, data: null };
      }

      // Update profile in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .update({
          name: data.name,
          avatar_url: data.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      return { data: profileData, error: profileError };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error, data: null };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
