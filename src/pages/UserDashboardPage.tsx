import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { useCart } from "@/context/CartContext";

const UserDashboardPage = () => {
  // Mock user data - in a real app, this would come from authentication context or API
  const userData = {
    userName: "John Doe",
    subscriptionType: "Premium" as const,
    subscriptionEndDate: "2023-12-31",
    // Other user data would be populated here
  };

  // Get cart state from context
  const { cartItems = [] } = useCart() || {};
  const cartItemCount = cartItems?.length || 0;

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
