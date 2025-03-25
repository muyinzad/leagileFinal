import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  cartItemCount?: number;
}

const MainLayout = ({
  children,
  isLoggedIn = false,
  userName = "Guest User",
  userAvatar = "",
  cartItemCount = 0,
}: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        userAvatar={userAvatar}
        cartItemCount={cartItemCount}
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
