import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ExpertCard from "./ExpertCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Expert {
  id: string;
  name: string;
  photo: string;
  credentials: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
}

interface FeaturedExpertsSectionProps {
  title?: string;
  description?: string;
  experts?: Expert[];
}

const FeaturedExpertsSection = ({
  title = "Featured Research Experts",
  description = "Connect with leading specialists in various research domains for personalized consultations and insights.",
  experts = [
    {
      id: "1",
      name: "Dr. Jane Smith",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert1",
      credentials: "Ph.D. in Economics, Harvard University",
      specialties: [
        "Market Research",
        "Financial Analysis",
        "Economic Forecasting",
      ],
      rating: 4.8,
      reviewCount: 124,
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert2",
      credentials: "Professor of Computer Science, MIT",
      specialties: ["AI Research", "Machine Learning", "Data Science"],
      rating: 4.9,
      reviewCount: 156,
    },
    {
      id: "3",
      name: "Dr. Sarah Johnson",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert3",
      credentials: "Ph.D. in Environmental Science, Stanford",
      specialties: [
        "Climate Research",
        "Sustainability",
        "Environmental Policy",
      ],
      rating: 4.7,
      reviewCount: 98,
    },
    {
      id: "4",
      name: "Dr. Robert Williams",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert4",
      credentials: "Ph.D. in Biomedical Engineering, Johns Hopkins",
      specialties: [
        "Medical Research",
        "Biotechnology",
        "Healthcare Innovation",
      ],
      rating: 4.6,
      reviewCount: 87,
    },
    {
      id: "5",
      name: "Prof. Elena Rodriguez",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert5",
      credentials: "Professor of Psychology, UC Berkeley",
      specialties: [
        "Behavioral Research",
        "Cognitive Science",
        "Social Psychology",
      ],
      rating: 4.9,
      reviewCount: 142,
    },
  ],
}: FeaturedExpertsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleExperts, setVisibleExperts] = useState<Expert[]>([]);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Determine how many experts to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update visible experts when currentIndex or itemsPerView changes
  useEffect(() => {
    setVisibleExperts(experts.slice(currentIndex, currentIndex + itemsPerView));
  }, [currentIndex, itemsPerView, experts]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(experts.length - itemsPerView, prev + 1),
    );
  };

  return (
    <section className="w-full py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Top Experts</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                aria-label="Previous experts"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex >= experts.length - itemsPerView}
                aria-label="Next experts"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-4 overflow-hidden">
            {visibleExperts.map((expert) => (
              <div
                key={expert.id}
                className="transition-all duration-300 ease-in-out"
              >
                <ExpertCard
                  name={expert.name}
                  photo={expert.photo}
                  credentials={expert.credentials}
                  specialties={expert.specialties}
                  rating={expert.rating}
                  reviewCount={expert.reviewCount}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="font-medium">
            View All Experts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExpertsSection;
