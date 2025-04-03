import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    userName: "",
    subscriptionType: "Free" as const,
    subscriptionEndDate: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get cart state from context
  const { cartItems = [] } = useCart() || {};
  const cartItemCount = cartItems?.length || 0;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          return;
        }

        if (data) {
          setUserData({
            userName: data.name || user.user_metadata?.name || "User",
            subscriptionType: (data.subscription_type || "Free") as
              | "Premium"
              | "Free"
              | "None",
            subscriptionEndDate:
              data.subscription_end_date ||
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          });
        }
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (isLoading) {
    return (
      <MainLayout isLoggedIn={true} cartItemCount={cartItemCount}>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout isLoggedIn={true} cartItemCount={cartItemCount}>
      <UserDashboard
        userName={userData.userName}
        subscriptionType={userData.subscriptionType}
        subscriptionEndDate={userData.subscriptionEndDate}
      />
    </MainLayout>
  );
};

export default UserDashboardPage;
