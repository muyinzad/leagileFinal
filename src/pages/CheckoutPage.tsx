import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number must not exceed 19 digits" }),
  cardholderName: z
    .string()
    .min(3, { message: "Please enter cardholder name" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "Expiry date must be in MM/YY format",
  }),
  cvv: z
    .string()
    .min(3, { message: "CVV must be 3 or 4 digits" })
    .max(4, { message: "CVV must be 3 or 4 digits" }),
});

const mobileMoneySchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" }),
  fullName: z.string().min(3, { message: "Please enter your full name" }),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const creditCardForm = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const mtnMoneyForm = useForm<z.infer<typeof mobileMoneySchema>>({
    resolver: zodResolver(mobileMoneySchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
    },
  });

  const airtelMoneyForm = useForm<z.infer<typeof mobileMoneySchema>>({
    resolver: zodResolver(mobileMoneySchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
    },
  });

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  const handleCreditCardSubmit = (values: z.infer<typeof creditCardSchema>) => {
    console.log("Credit card payment submitted:", values);
    processPayment();
  };

  const handleMobileMoneySubmit = (
    values: z.infer<typeof mobileMoneySchema>,
    provider: string,
  ) => {
    console.log(`${provider} payment submitted:`, values);
    processPayment();
  };

  const processPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Clear cart after successful payment
      clearCart();
      // Redirect to success page after a delay
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-md">
            <div className="rounded-full bg-green-100 p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been processed
              successfully.
            </p>
            <Button asChild className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/cart">
            <Button variant="ghost" className="p-0 mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                    <TabsTrigger value="mtn-money">MTN Money</TabsTrigger>
                    <TabsTrigger value="airtel-money">Airtel Money</TabsTrigger>
                    <TabsTrigger value="bank-transfer" disabled>
                      Bank Transfer
                    </TabsTrigger>
                  </TabsList>

                  {/* Credit Card Form */}
                  <TabsContent value="credit-card">
                    <Form {...creditCardForm}>
                      <form
                        onSubmit={creditCardForm.handleSubmit(
                          handleCreditCardSubmit,
                        )}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">Card Details</h3>
                          <div className="flex gap-2">
                            <div className="h-8 w-12 rounded border flex items-center justify-center bg-slate-50">
                              <span className="text-xs font-bold text-blue-600">
                                VISA
                              </span>
                            </div>
                            <div className="h-8 w-12 rounded border flex items-center justify-center bg-slate-50">
                              <span className="text-xs font-bold text-red-600">
                                MC
                              </span>
                            </div>
                          </div>
                        </div>

                        <FormField
                          control={creditCardForm.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  {...field}
                                  onChange={(e) => {
                                    // Format card number with spaces
                                    const value = e.target.value
                                      .replace(/\s/g, "")
                                      .replace(/\D/g, "");
                                    const formattedValue = value
                                      .replace(/(.{4})/g, "$1 ")
                                      .trim();
                                    field.onChange(formattedValue);
                                  }}
                                  maxLength={19}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={creditCardForm.control}
                          name="cardholderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={creditCardForm.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="MM/YY"
                                    {...field}
                                    onChange={(e) => {
                                      let value = e.target.value.replace(
                                        /\D/g,
                                        "",
                                      );
                                      if (value.length > 2) {
                                        value =
                                          value.slice(0, 2) +
                                          "/" +
                                          value.slice(2, 4);
                                      }
                                      field.onChange(value);
                                    }}
                                    maxLength={5}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={creditCardForm.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="123"
                                    {...field}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(
                                        /\D/g,
                                        "",
                                      );
                                      field.onChange(value);
                                    }}
                                    maxLength={4}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full mt-6"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            "Processing..."
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Pay ${total.toFixed(2)}
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* MTN Money Form */}
                  <TabsContent value="mtn-money">
                    <Form {...mtnMoneyForm}>
                      <form
                        onSubmit={mtnMoneyForm.handleSubmit((values) =>
                          handleMobileMoneySubmit(values, "MTN Money"),
                        )}
                        className="space-y-4"
                      >
                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-yellow-400 mr-3 flex items-center justify-center">
                            <span className="font-bold text-black">MTN</span>
                          </div>
                          <h3 className="text-lg font-medium">MTN Money</h3>
                        </div>

                        <FormField
                          control={mtnMoneyForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>MTN Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="07XXXXXXXX"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter the MTN number registered with MTN Money
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={mtnMoneyForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormDescription>
                                Enter the name registered with MTN Money
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="bg-yellow-50 p-4 rounded-md mt-4">
                          <p className="text-sm">
                            You will receive a prompt on your phone to confirm
                            the payment of ${total.toFixed(2)}. Please enter
                            your MTN Money PIN to complete the transaction.
                          </p>
                        </div>

                        <Button
                          type="submit"
                          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600"
                          disabled={isProcessing}
                        >
                          {isProcessing
                            ? "Processing..."
                            : `Pay with MTN Money: $${total.toFixed(2)}`}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* Airtel Money Form */}
                  <TabsContent value="airtel-money">
                    <Form {...airtelMoneyForm}>
                      <form
                        onSubmit={airtelMoneyForm.handleSubmit((values) =>
                          handleMobileMoneySubmit(values, "Airtel Money"),
                        )}
                        className="space-y-4"
                      >
                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-red-600 mr-3 flex items-center justify-center">
                            <span className="font-bold text-white text-xs">
                              AIRTEL
                            </span>
                          </div>
                          <h3 className="text-lg font-medium">Airtel Money</h3>
                        </div>

                        <FormField
                          control={airtelMoneyForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Airtel Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="07XXXXXXXX"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter the Airtel number registered with Airtel
                                Money
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={airtelMoneyForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormDescription>
                                Enter the name registered with Airtel Money
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="bg-red-50 p-4 rounded-md mt-4">
                          <p className="text-sm">
                            You will receive a prompt on your phone to confirm
                            the payment of ${total.toFixed(2)}. Please enter
                            your Airtel Money PIN to complete the transaction.
                          </p>
                        </div>

                        <Button
                          type="submit"
                          className="w-full mt-6 bg-red-600 hover:bg-red-700"
                          disabled={isProcessing}
                        >
                          {isProcessing
                            ? "Processing..."
                            : `Pay with Airtel Money: $${total.toFixed(2)}`}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* Bank Transfer Tab */}
                  <TabsContent value="bank-transfer">
                    <div className="p-4 border rounded-md">
                      <h3 className="text-lg font-medium mb-4">
                        Bank Transfer Details
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Please make a transfer to the following bank account and
                        upload your receipt below.
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Bank Name:
                          </span>
                          <span className="font-medium">Example Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Account Name:
                          </span>
                          <span className="font-medium">
                            Leagile Data Research Center
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Account Number:
                          </span>
                          <span className="font-medium">1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Reference:
                          </span>
                          <span className="font-medium">
                            LDRC-{Math.floor(Math.random() * 1000000)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="receipt">Upload Receipt</Label>
                        <Input id="receipt" type="file" />
                        <Button className="w-full" disabled>
                          Submit Payment Proof
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
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
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between py-2">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.type === "report" && item.quantity && (
                              <span>Qty: {item.quantity}</span>
                            )}
                            {item.type === "subscription" && (
                              <span>Monthly subscription</span>
                            )}
                          </p>
                        </div>
                        <span>
                          ${item.price.toFixed(2)}
                          {item.type === "report" &&
                            item.quantity &&
                            item.quantity > 1 && (
                              <span className="text-xs text-muted-foreground block text-right">
                                ${(item.price * item.quantity).toFixed(2)} total
                              </span>
                            )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
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
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  By proceeding with this payment, you agree to our{" "}
                  <Link to="/terms" className="underline hover:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
