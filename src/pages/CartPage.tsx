import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CartItem from "@/components/cart/CartItem";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    navigate("/checkout");
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" className="p-0 mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Cart Items ({cartItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Link to="/">
                      <Button variant="outline" className="mt-4">
                        Browse Reports
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={removeFromCart}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-4 text-sm text-muted-foreground">
              <p className="mb-2">
                By proceeding to checkout, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-primary">
                  Terms of Service
                </Link>
                .
              </p>
              <p>
                Need help? Contact our{" "}
                <Link to="/support" className="underline hover:text-primary">
                  customer support
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
