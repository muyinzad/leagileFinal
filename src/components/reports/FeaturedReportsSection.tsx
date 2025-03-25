import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReportCard from "./ReportCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Report {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
  featured: boolean;
}

interface FeaturedReportsSectionProps {
  title?: string;
  description?: string;
  reports?: Report[];
  onAddToCart?: (reportId: string) => void;
  onPreview?: (reportId: string) => void;
}

const FeaturedReportsSection = ({
  title = "Featured Reports",
  description = "Handpicked research reports selected by our editorial team for their exceptional quality and relevance.",
  reports = [
    {
      id: "featured-1",
      title: "Global AI Market Trends 2023-2030",
      author: "Dr. Robert Zhang",
      description:
        "Comprehensive analysis of artificial intelligence market trends, investment opportunities, and future growth projections across industries.",
      price: 99.99,
      rating: 4.9,
      thumbnail:
        "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=400&q=80",
      category: "Technology",
      featured: true,
    },
    {
      id: "featured-2",
      title: "Healthcare Innovation: Post-Pandemic Strategies",
      author: "Prof. Michael Chen",
      description:
        "An in-depth look at healthcare innovations accelerated by the pandemic, with forecasts for industry transformation and investment opportunities.",
      price: 79.99,
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
      category: "Healthcare",
      featured: true,
    },
    {
      id: "featured-3",
      title: "Renewable Energy Market Analysis 2023",
      author: "Dr. Sarah Johnson",
      description:
        "Comprehensive research on renewable energy markets, policy impacts, and projected growth across solar, wind, and alternative energy sources.",
      price: 89.99,
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&q=80",
      category: "Energy",
      featured: true,
    },
    {
      id: "featured-4",
      title: "Fintech Disruption: Banking Revolution",
      author: "Alex Rivera, MBA",
      description:
        "Analysis of how fintech startups are reshaping traditional banking, with case studies and future trend predictions for investors and industry professionals.",
      price: 69.99,
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80",
      category: "Finance",
      featured: true,
    },
    {
      id: "featured-5",
      title: "Supply Chain Resilience in Global Markets",
      author: "Maria Gonzalez, PhD",
      description:
        "Research on building resilient supply chains in volatile global markets, with strategies for risk mitigation and competitive advantage.",
      price: 74.99,
      rating: 4.5,
      thumbnail:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80",
      category: "Logistics",
      featured: true,
    },
    {
      id: "featured-6",
      title: "Cybersecurity Threats and Mitigation Strategies",
      author: "Dr. James Wilson",
      description:
        "Analysis of emerging cybersecurity threats and comprehensive strategies for organizations to protect their digital assets and infrastructure.",
      price: 84.99,
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80",
      category: "Security",
      featured: true,
    },
    {
      id: "featured-7",
      title: "E-commerce Evolution: Post-Pandemic Consumer Behavior",
      author: "Dr. Lisa Thompson",
      description:
        "Research on changing consumer behavior in e-commerce after the pandemic, with insights for retailers and digital marketers.",
      price: 64.99,
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
      category: "Retail",
      featured: true,
    },
    {
      id: "featured-8",
      title: "Sustainable Business Practices: ROI Analysis",
      author: "Dr. Emily Parker",
      description:
        "Comprehensive analysis of the return on investment for sustainable business practices across industries, with case studies and implementation frameworks.",
      price: 79.99,
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
      category: "Sustainability",
      featured: true,
    },
  ],
  onAddToCart = (reportId: string) => console.log(`Add to cart: ${reportId}`),
  onPreview = (reportId: string) => console.log(`Preview: ${reportId}`),
}: FeaturedReportsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReports, setVisibleReports] = useState<Report[]>([]);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Determine how many reports to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update visible reports when currentIndex or itemsPerView changes
  useEffect(() => {
    setVisibleReports(reports.slice(currentIndex, currentIndex + itemsPerView));
  }, [currentIndex, itemsPerView]); // Removed 'reports' from dependencies as it's causing an infinite loop

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(reports.length - itemsPerView, prev + 1),
    );
  };

  return (
    <section className="w-full py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Editor's Picks</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                aria-label="Previous reports"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex >= reports.length - itemsPerView}
                aria-label="Next reports"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div ref={carouselRef} className="flex gap-4 overflow-hidden">
            {visibleReports.map((report) => (
              <div
                key={report.id}
                className="transition-all duration-300 ease-in-out"
                style={{ width: `${100 / itemsPerView}%`, maxWidth: "350px" }}
              >
                <ReportCard
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
              </div>
            ))}
          </div>
        </div>

        {/* Removed 'View All Featured Reports' button as requested */}
      </div>
    </section>
  );
};

export default FeaturedReportsSection;
