import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LineChart,
  Microscope,
  Building,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Globe,
  Database,
  Shield,
} from "lucide-react";

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
}

const CategoryItem = ({ icon, name, onClick = () => {} }: CategoryProps) => {
  const handleClick = () => {
    console.log(`Category selected: ${name}`);
    onClick();
  };
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-32 w-32 p-4 gap-2 rounded-lg bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-300 snap-center flex-shrink-0"
      onClick={handleClick}
    >
      <div className="text-primary p-2 rounded-full bg-primary/10">{icon}</div>
      <span className="text-sm font-medium text-center">{name}</span>
    </Button>
  );
};

interface CategoryBrowserProps {
  categories?: CategoryProps[];
  onCategorySelect?: (category: string) => void;
  activeCategory?: string;
}

const CategoryBrowser = ({
  categories = [
    { icon: <BookOpen size={24} />, name: "Academic Research" },
    { icon: <LineChart size={24} />, name: "Market Analysis" },
    { icon: <Microscope size={24} />, name: "Scientific Studies" },
    { icon: <Building size={24} />, name: "Industry Reports" },
    { icon: <Briefcase size={24} />, name: "Business Strategy" },
    { icon: <GraduationCap size={24} />, name: "Educational" },
    { icon: <HeartPulse size={24} />, name: "Healthcare" },
    { icon: <Globe size={24} />, name: "Global Trends" },
    { icon: <Database size={24} />, name: "Data Analysis" },
    { icon: <Shield size={24} />, name: "Security Research" },
  ],
  activeCategory = "",
  onCategorySelect = (category) => {
    // Navigate to category page with proper routing
    window.location.href = `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`;
  },
}: CategoryBrowserProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });

      // Log scrolling action for analytics
      console.log(`Scrolled ${direction} in category browser`);
    }
  };

  // Check if we can scroll in a particular direction
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Add custom CSS to hide scrollbar
  React.useEffect(() => {
    // Add CSS to hide scrollbar but allow scrolling
    const style = document.createElement("style");
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Update scroll buttons state when scrolling happens
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScrollability = () => {
      // Check if we can scroll left (scrollLeft > 0)
      setCanScrollLeft(container.scrollLeft > 0);

      // Check if we can scroll right (scrollLeft < scrollWidth - clientWidth)
      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10,
      );
    };

    // Initial check
    checkScrollability();

    // Add event listener for scroll
    container.addEventListener("scroll", checkScrollability);

    // Cleanup
    return () => {
      container.removeEventListener("scroll", checkScrollability);
    };
  }, []);

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Explore our research reports by specialized domains
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              className={cn(!canScrollLeft && "opacity-50 cursor-not-allowed")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              disabled={!canScrollRight}
              className={cn(!canScrollRight && "opacity-50 cursor-not-allowed")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 pb-4 px-1 overflow-x-auto snap-x snap-mandatory"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                icon={category.icon}
                name={category.name}
                onClick={() => onCategorySelect(category.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBrowser;
