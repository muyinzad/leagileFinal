import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReportPreview from "./ReportPreview";
import { useCart } from "@/context/CartContext";

interface ReportCardProps {
  id?: string;
  title?: string;
  author?: string;
  description?: string;
  price?: number;
  rating?: number;
  thumbnail?: string;
  category?: string;
  onAddToCart?: () => void;
  onPreview?: () => void;
  buttonLabel?: string;
}

const ReportCard = ({
  id = "report-1",
  title = "Advanced Market Analysis: Emerging Trends in Technology",
  author = "Dr. Jane Smith",
  description = "A comprehensive analysis of emerging market trends in the technology sector, with insights on investment opportunities and future growth areas.",
  price = 49.99,
  rating = 4.5,
  thumbnail = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  category = "Technology",
  onAddToCart,
  onPreview,
  buttonLabel = "Preview",
}: ReportCardProps) => {
  const { addToCart } = useCart();
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = () => {
    if (buttonLabel === "Download") {
      // Add to cart instead of opening preview
      const cartItem = {
        id,
        type: "report" as const,
        title,
        price,
        quantity: 1,
        thumbnail,
      };
      addToCart(cartItem);
      if (onAddToCart) onAddToCart();
      // Navigate directly to checkout page instead of cart
      window.location.href = "/checkout";
    } else {
      setPreviewOpen(true);
    }
  };

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
      </div>
    );
  };

  return (
    <Card className="w-full max-w-[350px] h-[380px] flex flex-col overflow-hidden bg-white">
      <ReportPreview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        report={{
          id,
          title,
          author,
          description,
          price,
          rating,
          thumbnail,
          category,
        }}
      />
      <div className="relative h-40 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          {category}
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-1">
            {title}
          </CardTitle>
        </div>
        <p className="text-sm text-gray-600 mt-1">{author}</p>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <CardDescription className="text-sm line-clamp-3">
          {description}
        </CardDescription>
        <div className="mt-2">{renderRating()}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-bold text-lg">${price.toFixed(2)}</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="flex items-center gap-1"
          >
            {buttonLabel === "Download" ? (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Preview
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              const cartItem = {
                id,
                type: "report" as const,
                title,
                price,
                quantity: 1,
                thumbnail,
              };
              addToCart(cartItem);
              if (onAddToCart) onAddToCart();
            }}
            className="flex items-center gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
