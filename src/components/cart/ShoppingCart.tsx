import React, { useState } from "react";
import { ShoppingCart as CartIcon, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import CartItem, { CartItemType } from "./CartItem";
import { useCart } from "@/context/CartContext";

interface ShoppingCartProps {
  cartItems?: CartItemType[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onCheckout?: () => void;
}

const ShoppingCart = ({
  cartItems: propCartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout = () => {},
}: ShoppingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    cartItems: contextCartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Use provided cart items or fall back to context
  const cartItems = propCartItems || contextCartItems;

  // Use provided handlers or fall back to context
  const handleRemoveItem = onRemoveItem || removeFromCart;
  const handleUpdateQuantity = onUpdateQuantity || updateQuantity;

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CartIcon className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <CartIcon className="mr-2 h-5 w-5" />
            Shopping Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <CartIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-auto">
            <div className="space-y-2 py-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-col">
              <Button
                className="w-full"
                onClick={() => {
                  onCheckout();
                  setIsOpen(false);
                }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
