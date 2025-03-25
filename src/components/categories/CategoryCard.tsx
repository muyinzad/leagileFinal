import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: React.ReactNode;
  name: string;
  slug: string;
  description?: string;
  reportCount?: number;
  className?: string;
}

const CategoryCard = ({
  icon,
  name,
  slug,
  description = "Browse research reports in this category",
  reportCount = 0,
  className,
}: CategoryCardProps) => {
  return (
    <Link to={`/categories/${slug}`}>
      <Card
        className={cn(
          "h-full transition-all duration-200 hover:shadow-md hover:border-primary/50",
          className,
        )}
      >
        <CardContent className="flex flex-col items-center text-center p-6">
          <div className="text-primary p-3 rounded-full bg-primary/10 mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          {reportCount > 0 && (
            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
              {reportCount} reports
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
