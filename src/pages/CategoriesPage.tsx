import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportCard from "@/components/reports/ReportCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
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
} from "lucide-react";

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

const categories = [
  { icon: <BookOpen size={24} />, name: "Academic Research", slug: "academic" },
  { icon: <LineChart size={24} />, name: "Market Analysis", slug: "market" },
  {
    icon: <Microscope size={24} />,
    name: "Scientific Studies",
    slug: "scientific",
  },
  { icon: <Building size={24} />, name: "Industry Reports", slug: "industry" },
  {
    icon: <Briefcase size={24} />,
    name: "Business Strategy",
    slug: "business",
  },
  {
    icon: <GraduationCap size={24} />,
    name: "Educational",
    slug: "educational",
  },
  { icon: <HeartPulse size={24} />, name: "Healthcare", slug: "healthcare" },
  { icon: <Globe size={24} />, name: "Global Trends", slug: "global" },
  { icon: <Database size={24} />, name: "Data Analysis", slug: "data" },
  { icon: <Shield size={24} />, name: "Security Research", slug: "security" },
];

// Sample reports data
const allReports: Report[] = [
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
    category: "market",
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
    category: "healthcare",
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
    category: "industry",
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
    category: "business",
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
    category: "data",
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
    category: "global",
  },
  {
    id: "report-7",
    title: "Cybersecurity Threats and Mitigation Strategies",
    author: "Dr. Alan Parker",
    description:
      "Analysis of emerging cybersecurity threats and comprehensive strategies for organizations to protect their digital assets and infrastructure.",
    price: 64.99,
    rating: 4.7,
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    category: "security",
  },
  {
    id: "report-8",
    title: "Educational Technology: Impact on Learning Outcomes",
    author: "Prof. Lisa Johnson",
    description:
      "Research on how educational technology is transforming learning environments and improving student outcomes across different educational levels.",
    price: 49.99,
    rating: 4.5,
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    category: "educational",
  },
  {
    id: "report-9",
    title: "Quantum Computing: Scientific Breakthroughs and Applications",
    author: "Dr. Richard Feynman",
    description:
      "Detailed analysis of recent breakthroughs in quantum computing research and potential applications across various scientific disciplines.",
    price: 89.99,
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
    category: "scientific",
  },
  {
    id: "report-10",
    title: "Academic Research Methods in Social Sciences",
    author: "Dr. Emily Carter",
    description:
      "Comprehensive guide to research methodologies, data collection techniques, and analysis frameworks for social science researchers and students.",
    price: 44.99,
    rating: 4.6,
    thumbnail:
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&q=80",
    category: "academic",
  },
];

const CategoriesPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(categorySlug || "all");

  // Find the current category object
  const currentCategory = categories.find((cat) => cat.slug === activeCategory);
  const categoryTitle = currentCategory
    ? currentCategory.name
    : "All Categories";

  // Filter reports based on active category and search query
  const filteredReports = allReports.filter((report) => {
    const matchesCategory =
      activeCategory === "all" || report.category === activeCategory;
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (reportId: string) => {
    console.log(`Adding report to cart: ${reportId}`);
  };

  const handlePreview = (reportId: string) => {
    console.log(`Previewing report: ${reportId}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            Browse our collection of high-quality research reports in{" "}
            {categoryTitle.toLowerCase()}
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => setActiveCategory("all")}
            className="flex items-center gap-2"
          >
            All Categories
          </Button>

          {categories.map((category) => (
            <Button
              key={category.slug}
              variant={activeCategory === category.slug ? "default" : "outline"}
              onClick={() => setActiveCategory(category.slug)}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Research Reports</h2>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search in this category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Reports Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">Newly Added</TabsTrigger>
            <TabsTrigger value="most-reviewed">Most Reviewed</TabsTrigger>
          </TabsList>

          {["all", "trending", "new", "most-reviewed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              {filteredReports.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredReports.map((report) => (
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
                      onAddToCart={() => handleAddToCart(report.id)}
                      onPreview={() => handlePreview(report.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500 mb-4">
                    No reports found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
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
    </MainLayout>
  );
};

export default CategoriesPage;
