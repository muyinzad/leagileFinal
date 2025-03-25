import React from "react";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface CartItemType {
  id: string;
  type: "report" | "subscription";
  title: string;
  price: number;
  quantity?: number;
  thumbnail?: string;
}

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const isReport = item.type === "report";

  return (
    <div className="flex flex-col">
      <div className="flex items-start py-4">
        {/* Thumbnail for reports */}
        {isReport && item.thumbnail && (
          <div className="h-16 w-16 rounded overflow-hidden mr-4 flex-shrink-0">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Item details */}
        <div className="flex-grow">
          <div className="flex justify-between">
            <h3 className="font-medium text-sm md:text-base">{item.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground"
              onClick={() => onRemove(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {isReport ? "Research Report" : "Subscription Plan"}
          </p>

          {/* Quantity controls for reports */}
          {isReport && onUpdateQuantity && (
            <div className="flex items-center mt-2">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    Math.max(1, (item.quantity || 1) - 1),
                  )
                }
                disabled={(item.quantity || 1) <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="mx-2 text-sm">{item.quantity || 1}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() =>
                  onUpdateQuantity(item.id, (item.quantity || 1) + 1)
                }
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="text-right ml-4">
          <p className="font-medium">
            ${item.price.toFixed(2)}
            {!isReport && (
              <span className="text-xs text-muted-foreground">/mo</span>
            )}
          </p>
          {isReport && item.quantity && item.quantity > 1 && (
            <p className="text-xs text-muted-foreground">
              ${(item.price * item.quantity).toFixed(2)} total
            </p>
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default CartItem;
