import React from "react";
import HeroSection from "./home/HeroSection";
import CategoryBrowser from "./home/CategoryBrowser";
import ReportGrid from "./reports/ReportGrid";
import SubscriptionPlansSection from "./subscription/SubscriptionPlansSection";
import FeaturedExpertsSection from "./experts/FeaturedExpertsSection";
import FeaturedReportsSection from "./reports/FeaturedReportsSection";

interface HomePageProps {
  // Optional props with defaults to allow standalone rendering
}

const HomePage: React.FC<HomePageProps> = () => {
  // State for active category
  const [activeCategory, setActiveCategory] = React.useState<string>("");

  // Handlers for user interactions
  const handleCategorySelect = (category: string) => {
    console.log(`Category selected: ${category}`);
    setActiveCategory(category);
    // In a real app, this would filter reports by category
  };

  const handleAddToCart = (reportId: string) => {
    console.log(`Adding report to cart: ${reportId}`);
    // In a real app, this would add the report to the shopping cart
  };

  const handleReportPreview = (reportId: string) => {
    console.log(`Previewing report: ${reportId}`);
    // In a real app, this would open a preview modal or navigate to a preview page
  };

  const handleSelectPlan = (planId: string) => {
    console.log(`Subscription plan selected: ${planId}`);
    // In a real app, this would add the subscription plan to cart or start checkout
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Reports Section - Moved right after Hero Section */}
      <FeaturedReportsSection
        onAddToCart={handleAddToCart}
        onPreview={handleReportPreview}
      />

      {/* Category Browser */}
      <CategoryBrowser
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Research Reports Grid */}
        <section className="mb-16">
          <ReportGrid
            onAddToCart={handleAddToCart}
            onPreview={handleReportPreview}
          />
        </section>

        {/* Subscription Plans */}
        <section className="mb-16">
          <SubscriptionPlansSection onSelectPlan={handleSelectPlan} />
        </section>

        {/* Featured Experts */}
        <section className="mb-16">
          <FeaturedExpertsSection />
        </section>
      </div>
    </>
  );
};

export default HomePage;
