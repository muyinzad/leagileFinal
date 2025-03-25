import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Download, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { CartItemType } from "@/components/cart/CartItem";

interface ReportPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
    category: string;
    previewContent?: string;
  };
}

const ReportPreview: React.FC<ReportPreviewProps> = ({
  open,
  onOpenChange,
  report,
}) => {
  const { addToCart } = useCart();

  // Generate star rating display
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(report.rating);
    const hasHalfStar = report.rating % 1 >= 0.5;

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
        <span className="ml-1 text-sm text-gray-600">
          {report.rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const handleAddToCart = () => {
    const cartItem: CartItemType = {
      id: report.id,
      type: "report",
      title: report.title,
      price: report.price,
      quantity: 1,
      thumbnail: report.thumbnail,
    };
    addToCart(cartItem);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl">{report.title}</DialogTitle>
            <Badge variant="outline" className="ml-2">
              {report.category}
            </Badge>
          </div>
          <DialogDescription className="flex justify-between items-center">
            <span>By {report.author}</span>
            <div className="flex items-center">{renderRating()}</div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thumbnail */}
          <div className="md:col-span-1">
            <div className="rounded-md overflow-hidden">
              <img
                src={report.thumbnail}
                alt={report.title}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold mb-2">
                ${report.price.toFixed(2)}
              </div>
              <Button onClick={handleAddToCart} className="w-full mb-2">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Sample
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Report Preview</h3>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-sm text-muted-foreground mb-4">
                {report.description}
              </p>

              <div className="prose max-w-none">
                {report.previewContent ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: report.previewContent }}
                  />
                ) : (
                  <div className="p-3 bg-gray-100 rounded-md">
                    <p className="text-sm italic">
                      This is a preview of the report. Purchase to access the
                      full content.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Published: {new Date().toLocaleDateString()}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPreview;
