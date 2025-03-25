import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MessageSquare,
  Star,
  FileText,
  Clock,
  User,
} from "lucide-react";

interface ExpertProfileProps {
  id?: string;
  name?: string;
  photo?: string;
  credentials?: string;
  specialties?: string[];
  bio?: string;
  rating?: number;
  reviewCount?: number;
  reportsCount?: number;
  consultationRate?: number;
  availability?: string;
  onRequestConsultation?: () => void;
  onMessageExpert?: () => void;
}

const ExpertProfile = ({
  id = "expert-1",
  name = "Dr. Jane Smith",
  photo = "https://api.dicebear.com/7.x/avataaars/svg?seed=expert1",
  credentials = "Ph.D. in Economics, Harvard University",
  specialties = [
    "Market Research",
    "Financial Analysis",
    "Economic Forecasting",
  ],
  bio = "Dr. Jane Smith is a leading expert in economic research with over 15 years of experience in market analysis and financial forecasting. She has published numerous papers in top-tier journals and has consulted for Fortune 500 companies on economic strategy and market positioning.",
  rating = 4.8,
  reviewCount = 124,
  reportsCount = 18,
  consultationRate = 150,
  availability = "Available for consultations Mon-Fri, 9AM-5PM EST",
  onRequestConsultation = () => console.log("Request consultation clicked"),
  onMessageExpert = () => console.log("Message expert clicked"),
}: ExpertProfileProps) => {
  // Generate star rating display
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400" />);
      }
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">
          ({reviewCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Expert Photo and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 border-2 border-primary/20">
                <AvatarImage src={photo} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="mt-4">{renderRating()}</div>
            </div>

            {/* Expert Details */}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-muted-foreground mb-2">{credentials}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {reportsCount} Research Reports
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">${consultationRate}/hour</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button onClick={onRequestConsultation} className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Consultation
                </Button>
                <Button
                  variant="outline"
                  onClick={onMessageExpert}
                  className="flex-1"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Expert
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="about" className="mt-6">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reports">Research Reports</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Biography</h3>
              <p className="text-muted-foreground">{bio}</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Expertise</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">Education</h3>
              <p className="text-muted-foreground">{credentials}</p>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-semibold mb-1">
                  {reportsCount} Research Reports Available
                </h3>
                <p className="text-muted-foreground mb-4">
                  Access expert research reports authored by {name}
                </p>
                <Button>Browse Reports</Button>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="text-center py-8">
                <Star className="h-12 w-12 mx-auto text-yellow-400 mb-2" />
                <h3 className="text-lg font-semibold mb-1">
                  {reviewCount} Reviews from Clients
                </h3>
                <p className="text-muted-foreground mb-4">
                  See what others are saying about working with {name}
                </p>
                <Button variant="outline">View All Reviews</Button>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="mt-4">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-semibold mb-1">
                  Consultation Availability
                </h3>
                <p className="text-muted-foreground mb-4">{availability}</p>
                <Button>Schedule Consultation</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertProfile;
