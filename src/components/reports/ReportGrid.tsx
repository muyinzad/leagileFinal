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
import { Search, Filter, Loader2 } from "lucide-react";
import ReportCard from "./ReportCard";
import { useReportFilters } from "@/hooks/useReportFilters";
import {
  Report,
  getReports,
  getTrendingReports,
  getNewestReports,
  getReportCategories,
} from "@/lib/reports";
import { useToast } from "@/components/ui/use-toast";

interface ReportGridProps {
  reports?: Report[];
  onAddToCart?: (reportId: string) => void;
  onPreview?: (reportId: string) => void;
}

const ReportGrid = ({
  reports: initialReports,
  onAddToCart = (reportId: string) => console.log(`Add to cart: ${reportId}`),
  onPreview = (reportId: string) => console.log(`Preview: ${reportId}`),
}: ReportGridProps) => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [categories, setCategories] = useState<string[]>(["all"]);

  // Fetch reports from Supabase
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        // If initial reports were provided, use them
        if (initialReports && initialReports.length > 0) {
          setReports(initialReports);
          setIsLoading(false);
          return;
        }

        // Otherwise fetch from Supabase
        const { data, error } = await getReports();
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load reports. Please try again.",
            variant: "destructive",
          });
          console.error("Error fetching reports:", error);
        } else if (data) {
          setReports(data);
        }

        // Fetch categories
        const categoriesResult = await getReportCategories();
        if (categoriesResult.data) {
          setCategories(["all", ...categoriesResult.data]);
        }
      } catch (error) {
        console.error("Exception fetching reports:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while loading reports.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [initialReports, toast]);

  // Filter reports based on search query and category
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || report.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Add created date and review count for filtering if not already present
  const reportsWithMeta = filteredReports.map((report) => ({
    ...report,
    createdAt: report.created_at
      ? new Date(report.created_at)
      : new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
        ), // Use actual date or random date within last 30 days
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
    if (sortBy === "price-low")
      return parseFloat(a.price.toString()) - parseFloat(b.price.toString());
    if (sortBy === "price-high")
      return parseFloat(b.price.toString()) - parseFloat(a.price.toString());
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest")
      return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
    return 0;
  });

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Research Reports</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports..."
              className="pl-8 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading reports...</span>
          </div>
        ) : (
          ["trending", "new", "most-reviewed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              {sortedReports.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      id={report.id}
                      title={report.title}
                      author={report.author}
                      description={report.description || ""}
                      price={parseFloat(report.price.toString())}
                      rating={report.rating}
                      thumbnail={
                        report.thumbnail ||
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
                      }
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
          ))
        )}
      </Tabs>
    </div>
  );
};

export default ReportGrid;
