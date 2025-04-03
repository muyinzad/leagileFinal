import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/home";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryListPage from "./pages/CategoryListPage";
import ExpertsPage from "./pages/ExpertsPage";
import ExpertProfilePage from "./pages/ExpertProfilePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import AddReportPage from "./pages/AddReportPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageReports from "./pages/admin/ManageReports";
import ManageCategories from "./pages/admin/ManageCategories";
import ManagePricing from "./pages/admin/ManagePricing";
import ManageExperts from "./pages/admin/ManageExperts";
import ViewAnalytics from "./pages/admin/ViewAnalytics";
import DonationPage from "./pages/DonationPage";
import ServicesPage from "./pages/ServicesPage";
import routes from "tempo-routes";
import { useCart } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";

// Protected route component - must be used inside AuthProvider
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// This component must be used inside AuthProvider
function AuthenticatedRoutes() {
  // Get cart state from context
  const { cartItemCount } = useCart();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <MainLayout isLoggedIn={isLoggedIn} cartItemCount={cartItemCount}>
            <HomePage />
          </MainLayout>
        }
      />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/categories" element={<CategoryListPage />} />
      <Route path="/categories/:categorySlug" element={<CategoriesPage />} />
      <Route path="/experts" element={<ExpertsPage />} />
      <Route path="/experts/:expertId" element={<ExpertProfilePage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/add-report" element={<AddReportPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/donation" element={<DonationPage />} />
      <Route path="/services" element={<ServicesPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="reports" element={<ManageReports />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="pricing" element={<ManagePricing />} />
        <Route path="experts" element={<ManageExperts />} />
        <Route path="analytics" element={<ViewAnalytics />} />
      </Route>

      {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
    </Routes>
  );
}

// This component handles Tempo routes and doesn't use auth
function AppRoutes() {
  // Handle Tempo routes
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {tempoRoutes}
      <AuthProvider>
        <AuthenticatedRoutes />
        <Toaster />
      </AuthProvider>
    </Suspense>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
