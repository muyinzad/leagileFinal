import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import ReportCard from "./ReportCard";
import { useReportFilters } from "@/hooks/useReportFilters";

interface Report {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
}

interface ReportGridProps {
  reports?: Report[];
  onAddToCart?: (reportId: string) => void;
  onPreview?: (reportId: string) => void;
}

const ReportGrid = ({
  reports = [
    {
      id: "report-1",
      title: "Advanced Market Analysis: Emerging Trends in Technology",
      author: "Dr. Jane Smith",
      description:
        "A comprehensive analysis of emerging market trends in the technology sector, with insights on investment opportunities and future growth areas.",
      price: 49.99,
      rating: 4.5,
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      category: "Technology",
    },
    {
      id: "report-2",
      title: "Healthcare Innovation: Post-Pandemic Strategies",
      author: "Prof. Michael Chen",
      description:
        "An in-depth look at healthcare innovations accelerated by the pandemic, with forecasts for industry transformation and investment opportunities.",
      price: 59.99,
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
      category: "Healthcare",
    },
    {
      id: "report-3",
      title: "Sustainable Energy: Market Outlook 2023-2030",
      author: "Dr. Sarah Johnson",
      description:
        "Comprehensive research on renewable energy markets, policy impacts, and projected growth across solar, wind, and alternative energy sources.",
      price: 79.99,
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&q=80",
      category: "Energy",
    },
    {
      id: "report-4",
      title: "Fintech Revolution: Banking Disruption Analysis",
      author: "Alex Rivera, MBA",
      description:
        "Analysis of how fintech startups are reshaping traditional banking, with case studies and future trend predictions for investors and industry professionals.",
      price: 69.99,
      rating: 4.3,
      thumbnail:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80",
      category: "Finance",
    },
    {
      id: "report-5",
      title: "AI Implementation Strategies for Enterprise",
      author: "Dr. Robert Zhang",
      description:
        "Strategic framework for enterprise AI adoption, including ROI analysis, implementation roadmaps, and case studies from Fortune 500 companies.",
      price: 89.99,
      rating: 4.9,
      thumbnail:
        "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=400&q=80",
      category: "Technology",
    },
    {
      id: "report-6",
      title: "Supply Chain Resilience in Global Markets",
      author: "Maria Gonzalez, PhD",
      description:
        "Research on building resilient supply chains in volatile global markets, with strategies for risk mitigation and competitive advantage.",
      price: 54.99,
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80",
      category: "Logistics",
    },
  ],
  onAddToCart = (reportId: string) => console.log(`Add to cart: ${reportId}`),
  onPreview = (reportId: string) => console.log(`Preview: ${reportId}`),
}: ReportGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  // Filter reports based on search query and category
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || report.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Add created date and review count for filtering
  const reportsWithMeta = filteredReports.map((report) => ({
    ...report,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ), // Random date within last 30 days
    reviewCount: Math.floor(Math.random() * 50) + 5, // Random review count between 5-55
  }));

  // Use the report filters hook
  const {
    activeTab,
    setActiveTab,
    filteredReports: tabFilteredReports,
  } = useReportFilters({
    reports: reportsWithMeta,
    initialTab: "trending",
  });

  // Sort reports based on selected sort option
  const sortedReports = [...tabFilteredReports].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest")
      return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
    return 0;
  });

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(reports.map((report) => report.category)),
  ];

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Research Reports</h2>
      </div>

      <Tabs
        defaultValue="trending"
        className="w-full"
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "trending" | "new" | "most-reviewed")
        }
      >
        <TabsList className="mb-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="new">Newly Added</TabsTrigger>
          <TabsTrigger value="most-reviewed">Most Reviewed</TabsTrigger>
        </TabsList>

        {["trending", "new", "most-reviewed"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            {sortedReports.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    id={report.id}
                    title={report.title}
                    author={report.author}
                    description={report.description}
                    price={report.price}
                    rating={report.rating}
                    thumbnail={report.thumbnail}
                    category={report.category}
                    onAddToCart={() => onAddToCart(report.id)}
                    onPreview={() => onPreview(report.id)}
                    buttonLabel="Download"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No reports found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ReportGrid;
