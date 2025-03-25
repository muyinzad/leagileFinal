import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import ExpertCard from "@/components/experts/ExpertCard";
import FeaturedExpertsSection from "@/components/experts/FeaturedExpertsSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Expert {
  id: string;
  name: string;
  photo: string;
  credentials: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
}

const ExpertsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  // Sample experts data
  const experts: Expert[] = [
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
    {
      id: "6",
      name: "Dr. Thomas Lee",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert6",
      credentials: "Ph.D. in Finance, University of Chicago",
      specialties: [
        "Investment Analysis",
        "Corporate Finance",
        "Financial Markets",
      ],
      rating: 4.7,
      reviewCount: 113,
    },
    {
      id: "7",
      name: "Prof. Olivia Martinez",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert7",
      credentials: "Professor of Sociology, Columbia University",
      specialties: ["Social Research", "Demographic Analysis", "Urban Studies"],
      rating: 4.5,
      reviewCount: 89,
    },
    {
      id: "8",
      name: "Dr. James Wilson",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert8",
      credentials: "Ph.D. in Political Science, Yale University",
      specialties: [
        "Policy Analysis",
        "International Relations",
        "Government Research",
      ],
      rating: 4.6,
      reviewCount: 104,
    },
  ];

  // Get all unique specialties for filter dropdown
  const allSpecialties = new Set<string>();
  experts.forEach((expert) => {
    expert.specialties.forEach((specialty) => {
      allSpecialties.add(specialty);
    });
  });
  const specialties = ["all", ...Array.from(allSpecialties)];

  // Filter experts based on search query and specialty
  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.credentials.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "all" ||
      expert.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  // Sort experts based on selected sort option
  const sortedExperts = [...filteredExperts].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Featured Experts Section */}
        <section className="mb-16">
          <FeaturedExpertsSection />
        </section>

        {/* All Experts Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Expert Directory</h2>
              <p className="text-muted-foreground">
                Connect with leading specialists in various research domains for
                personalized consultations and insights
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search experts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedSpecialty}
                  onValueChange={setSelectedSpecialty}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty === "all" ? "All Specialties" : specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Experts</TabsTrigger>
              <TabsTrigger value="business">Business & Finance</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="science">Science & Medicine</TabsTrigger>
            </TabsList>

            {["all", "business", "technology", "science"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                {sortedExperts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedExperts.map((expert) => (
                      <ExpertCard
                        key={expert.id}
                        name={expert.name}
                        photo={expert.photo}
                        credentials={expert.credentials}
                        specialties={expert.specialties}
                        rating={expert.rating}
                        reviewCount={expert.reviewCount}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 mb-4">
                      No experts found matching your criteria.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedSpecialty("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    </MainLayout>
  );
};

export default ExpertsPage;
