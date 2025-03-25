import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, User } from "lucide-react";

interface ExpertCardProps {
  id?: string;
  name: string;
  photo: string;
  credentials: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  onViewProfile?: () => void;
  onContact?: () => void;
}

const ExpertCard = ({
  id = "expert-1",
  name = "Dr. Jane Smith",
  photo = "https://api.dicebear.com/7.x/avataaars/svg?seed=expert1",
  credentials = "Ph.D. in Economics, Harvard University",
  specialties = [
    "Market Research",
    "Financial Analysis",
    "Economic Forecasting",
  ],
  rating = 4.8,
  reviewCount = 124,
  onViewProfile = () => {},
  onContact = () => {},
}: ExpertCardProps) => {
  return (
    <Card className="w-[300px] h-[320px] overflow-hidden flex flex-col bg-white">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {credentials}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">
            ({reviewCount} reviews)
          </span>
        </div>

        <h4 className="text-sm font-medium mb-1">Specialties:</h4>
        <div className="flex flex-wrap gap-1 mb-3">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Expert in providing research-backed insights and analysis in
          specialized domains.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2 pb-4">
        <Link to={`/experts/${id}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onViewProfile}
          >
            <User className="h-4 w-4 mr-1" />
            View Profile
          </Button>
        </Link>
        <Button size="sm" className="flex-1" onClick={onContact}>
          <MessageSquare className="h-4 w-4 mr-1" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpertCard;
