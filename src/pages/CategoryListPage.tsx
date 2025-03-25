import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CategoryCard from "@/components/categories/CategoryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  LineChart,
  Microscope,
  Building,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Globe,
  Database,
  Shield,
  Search,
} from "lucide-react";

const categories = [
  {
    icon: <BookOpen size={24} />,
    name: "Academic Research",
    slug: "academic",
    description: "Scholarly articles and papers from academic institutions",
    reportCount: 42,
  },
  {
    icon: <LineChart size={24} />,
    name: "Market Analysis",
    slug: "market",
    description: "Insights on market trends, opportunities, and forecasts",
    reportCount: 38,
  },
  {
    icon: <Microscope size={24} />,
    name: "Scientific Studies",
    slug: "scientific",
    description: "Research findings from scientific experiments and studies",
    reportCount: 27,
  },
  {
    icon: <Building size={24} />,
    name: "Industry Reports",
    slug: "industry",
    description: "Comprehensive analysis of specific industry sectors",
    reportCount: 35,
  },
  {
    icon: <Briefcase size={24} />,
    name: "Business Strategy",
    slug: "business",
    description: "Strategic frameworks and business model analyses",
    reportCount: 31,
  },
  {
    icon: <GraduationCap size={24} />,
    name: "Educational",
    slug: "educational",
    description: "Research on learning methodologies and educational systems",
    reportCount: 24,
  },
  {
    icon: <HeartPulse size={24} />,
    name: "Healthcare",
    slug: "healthcare",
    description: "Medical research and healthcare system analyses",
    reportCount: 29,
  },
  {
    icon: <Globe size={24} />,
    name: "Global Trends",
    slug: "global",
    description: "Research on international developments and global patterns",
    reportCount: 33,
  },
  {
    icon: <Database size={24} />,
    name: "Data Analysis",
    slug: "data",
    description: "Statistical analyses and data-driven research findings",
    reportCount: 26,
  },
  {
    icon: <Shield size={24} />,
    name: "Security Research",
    slug: "security",
    description: "Studies on cybersecurity, risk management, and protection",
    reportCount: 22,
  },
];

const CategoryListPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Research Categories</h1>
            <p className="text-muted-foreground">
              Browse our comprehensive collection of research reports by
              category
            </p>
            <div className="mt-4">
              <Link to="/add-report">
                <Button className="bg-primary hover:bg-primary/90">
                  Add New File
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.slug}
                icon={category.icon}
                name={category.name}
                slug={category.slug}
                description={category.description}
                reportCount={category.reportCount}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">
              No categories found matching your search.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryListPage;
