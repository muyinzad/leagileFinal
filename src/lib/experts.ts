import { supabase } from "./supabase";

export interface ExpertProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  bio: string;
  specialization: string;
  years_experience: number;
  hourly_rate: number;
  avatar_url?: string;
  is_verified: boolean;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Consultation {
  id: string;
  user_id: string;
  expert_id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  consultation_type: "message" | "video_call";
  scheduled_at?: string;
  duration_minutes?: number;
  topic: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  expert?: ExpertProfile;
}

// Fetch all verified experts
export const getExperts = async () => {
  try {
    const { data, error } = await supabase
      .from("expert_profiles")
      .select("*")
      .eq("is_verified", true)
      .eq("is_available", true)
      .order("years_experience", { ascending: false });

    if (error) {
      console.error("Error fetching experts:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Exception fetching experts:", error);
    return { data: null, error };
  }
};

// Fetch a single expert by ID
export const getExpertById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("expert_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching expert with ID ${id}:`, error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(`Exception fetching expert with ID ${id}:`, error);
    return { data: null, error };
  }
};

// Create a new expert profile
export const createExpertProfile = async (
  profile: Omit<ExpertProfile, "id" | "is_verified">,
) => {
  try {
    // Set is_verified to false by default - requires admin approval
    const expertProfile = {
      ...profile,
      is_verified: false,
    };

    const { data, error } = await supabase
      .from("expert_profiles")
      .insert([expertProfile])
      .select();

    if (error) {
      console.error("Error creating expert profile:", error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Exception creating expert profile:", error);
    return { data: null, error };
  }
};

// Update an existing expert profile
export const updateExpertProfile = async (
  id: string,
  updates: Partial<ExpertProfile>,
) => {
  try {
    // Ensure users can't set themselves as verified
    if (updates.is_verified !== undefined) {
      delete updates.is_verified;
    }

    const { data, error } = await supabase
      .from("expert_profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Error updating expert profile with ID ${id}:`, error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(`Exception updating expert profile with ID ${id}:`, error);
    return { data: null, error };
  }
};

// Verify an expert (admin only)
export const verifyExpert = async (id: string, isVerified: boolean) => {
  try {
    const { data, error } = await supabase
      .from("expert_profiles")
      .update({ is_verified: isVerified, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error(
        `Error ${isVerified ? "verifying" : "unverifying"} expert with ID ${id}:`,
        error,
      );
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(
      `Exception ${isVerified ? "verifying" : "unverifying"} expert with ID ${id}:`,
      error,
    );
    return { data: null, error };
  }
};

// Request a consultation with an expert
export const requestConsultation = async (
  consultation: Omit<Consultation, "id" | "status">,
) => {
  try {
    const newConsultation = {
      ...consultation,
      status: "pending" as const,
    };

    const { data, error } = await supabase
      .from("consultations")
      .insert([newConsultation])
      .select();

    if (error) {
      console.error("Error requesting consultation:", error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Exception requesting consultation:", error);
    return { data: null, error };
  }
};

// Get user's consultations
export const getUserConsultations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("consultations")
      .select(
        `
        *,
        expert:expert_id(*)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching consultations for user ${userId}:`, error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(
      `Exception fetching consultations for user ${userId}:`,
      error,
    );
    return { data: null, error };
  }
};

// Get expert's consultations
export const getExpertConsultations = async (expertId: string) => {
  try {
    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .eq("expert_id", expertId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching consultations for expert ${expertId}:`,
        error,
      );
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error(
      `Exception fetching consultations for expert ${expertId}:`,
      error,
    );
    return { data: null, error };
  }
};

// Update consultation status
export const updateConsultationStatus = async (
  id: string,
  status: Consultation["status"],
) => {
  try {
    const { data, error } = await supabase
      .from("consultations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Error updating consultation status for ID ${id}:`, error);
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error(
      `Exception updating consultation status for ID ${id}:`,
      error,
    );
    return { data: null, error };
  }
};
