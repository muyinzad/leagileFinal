import { useState, useEffect } from "react";

interface Report {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
  createdAt?: Date;
  reviewCount?: number;
}

interface UseReportFiltersProps {
  reports: Report[];
  initialTab?: "trending" | "new" | "most-reviewed";
}

export function useReportFilters({
  reports,
  initialTab = "trending",
}: UseReportFiltersProps) {
  const [activeTab, setActiveTab] = useState<
    "trending" | "new" | "most-reviewed"
  >(initialTab);
  const [filteredReports, setFilteredReports] = useState<Report[]>(reports);

  // Apply filters based on active tab
  useEffect(() => {
    let result = [...reports];

    switch (activeTab) {
      case "trending":
        // Sort by a combination of rating and review count
        result = result.sort((a, b) => {
          const scoreA = a.rating * 0.7 + (a.reviewCount || 0) * 0.3;
          const scoreB = b.rating * 0.7 + (b.reviewCount || 0) * 0.3;
          return scoreB - scoreA;
        });
        break;

      case "new":
        // Sort by creation date (newest first)
        result = result.sort((a, b) => {
          const dateA = a.createdAt || new Date(0);
          const dateB = b.createdAt || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        break;

      case "most-reviewed":
        // Sort by review count
        result = result.sort((a, b) => {
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        });
        break;
    }

    setFilteredReports(result);
  }, [reports, activeTab]);

  return {
    activeTab,
    setActiveTab,
    filteredReports,
  };
}
