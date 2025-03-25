import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import ShoppingCart from "../cart/ShoppingCart";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  logoText?: string;
  slogan?: string;
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  logoText = "Leagile Data Research Center",
  slogan = "The source of research Data",

  cartItemCount,
  isLoggedIn = false,
  userName = "Guest User",
  userAvatar = "",
}: HeaderProps) => {
  const { cartItems } = useCart();
  const actualCartCount =
    cartItemCount !== undefined ? cartItemCount : cartItems.length;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">R</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-bold text-xl">{logoText}</span>
            <span className="text-xs text-muted-foreground">{slogan}</span>
          </div>
        </Link>

        {/* Mobile Menu Button - Only visible on small screens */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Categories
          </Link>
          <Link
            to="/experts"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Experts
          </Link>
          <Link
            to="/subscription"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Subscription Plans
          </Link>
          <Link
            to="/donation"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Donation
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Services
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Shopping Cart */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              {actualCartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {actualCartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Account */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/my-reports" className="w-full">
                    My Reports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/consultations" className="w-full">
                    My Consultations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/logout" className="w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="hidden md:flex">
                  Register
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <User className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
