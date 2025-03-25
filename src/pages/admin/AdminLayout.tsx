import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Tag,
  DollarSign,
  Users,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      name: "Pricing",
      path: "/admin/pricing",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      name: "Experts",
      path: "/admin/experts",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/admin" && currentPath === "/admin") return true;
    if (path !== "/admin" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <span className="font-bold text-xl">LDRC Admin</span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`w-full justify-start ${isActive(item.path) ? "" : "hover:bg-gray-100"}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
          <Separator className="my-2" />
          <Link to="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center px-6">
          <h1 className="text-xl font-semibold">Admin Portal</h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
