import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ExpertProfile from "@/components/experts/ExpertProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ReportCard from "@/components/reports/ReportCard";

const ExpertProfilePage = () => {
  const { expertId } = useParams<{ expertId: string }>();

  // In a real app, you would fetch the expert data based on expertId
  // For now, we'll use mock data
  const expertData = {
    id: expertId || "expert-1",
    name: "Dr. Jane Smith",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert1",
    credentials: "Ph.D. in Economics, Harvard University",
    specialties: [
      "Market Research",
      "Financial Analysis",
      "Economic Forecasting",
    ],
    bio: "Dr. Jane Smith is a leading expert in economic research with over 15 years of experience in market analysis and financial forecasting. She has published numerous papers in top-tier journals and has consulted for Fortune 500 companies on economic strategy and market positioning.",
    rating: 4.8,
    reviewCount: 124,
    reportsCount: 18,
    consultationRate: 150,
    availability: "Available for consultations Mon-Fri, 9AM-5PM EST",
  };

  // Mock reports by this expert
  const expertReports = [
    {
      id: "report-1",
      title: "Advanced Market Analysis: Emerging Trends in Technology",
      author: expertData.name,
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
      title: "Economic Impact of Global Supply Chain Disruptions",
      author: expertData.name,
      description:
        "Analysis of how global supply chain disruptions affect economic stability and strategies for businesses to mitigate risks.",
      price: 59.99,
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80",
      category: "Economics",
    },
    {
      id: "report-3",
      title: "Investment Strategies for Volatile Markets",
      author: expertData.name,
      description:
        "Research-backed investment strategies designed to maximize returns while minimizing risks during periods of market volatility.",
      price: 69.99,
      rating: 4.9,
      thumbnail:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
      category: "Finance",
    },
  ];

  const handleRequestConsultation = () => {
    console.log(`Requesting consultation with ${expertData.name}`);
    // In a real app, this would open a consultation request form or modal
  };

  const handleMessageExpert = () => {
    console.log(`Messaging ${expertData.name}`);
    // In a real app, this would open a messaging interface
  };

  const handleAddToCart = (reportId: string) => {
    console.log(`Adding report ${reportId} to cart`);
    // In a real app, this would add the report to the shopping cart
  };

  const handlePreviewReport = (reportId: string) => {
    console.log(`Previewing report ${reportId}`);
    // In a real app, this would open a report preview
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/experts">
            <Button variant="ghost" className="p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Experts
            </Button>
          </Link>
        </div>

        <ExpertProfile
          {...expertData}
          onRequestConsultation={handleRequestConsultation}
          onMessageExpert={handleMessageExpert}
        />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Research Reports by {expertData.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertReports.map((report) => (
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
                onPreview={() => handlePreviewReport(report.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExpertProfilePage;
