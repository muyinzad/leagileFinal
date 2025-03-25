import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Check, X, Save, DollarSign } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: "monthly" | "yearly";
  features: {
    name: string;
    included: boolean;
    tooltip?: string;
  }[];
  popular?: boolean;
  buttonText: string;
}

const defaultPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Research Access",
    description: "Basic access to limited research content",
    price: 0,
    period: "monthly",
    buttonText: "Start Free",
    features: [
      { name: "Access to 5 free reports", included: true },
      { name: "Limited downloads (3/month)", included: true },
      { name: "Basic search functionality", included: true },
      { name: "Community forum access", included: true },
      {
        name: "Monthly expert consultations",
        included: false,
        tooltip: "Available in Premium plan",
      },
      { name: "Early access to new reports", included: false },
      { name: "Advanced analytics dashboard", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Research Access",
    description: "Full access to all reports and expert consultations",
    price: 99.99,
    period: "monthly",
    popular: true,
    buttonText: "Subscribe Now",
    features: [
      { name: "Unlimited access to all reports", included: true },
      { name: "Unlimited downloads", included: true },
      { name: "Advanced search & filters", included: true },
      { name: "Priority email & phone support", included: true },
      {
        name: "Monthly expert consultations",
        included: true,
        tooltip: "2 hours of expert consultation per month",
      },
      { name: "Early access to new reports", included: true },
      { name: "Advanced analytics dashboard", included: true },
    ],
  },
];

const subscriptionFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  buttonText: z.string().min(2, {
    message: "Button text must be at least 2 characters",
  }),
});

const reportPricingFormSchema = z.object({
  minPrice: z.coerce
    .number()
    .min(0, { message: "Minimum price cannot be negative" }),
  maxPrice: z.coerce
    .number()
    .min(0.01, { message: "Maximum price must be greater than 0" }),
  defaultPrice: z.coerce
    .number()
    .min(0.01, { message: "Default price must be greater than 0" }),
});

const ManagePricing = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(defaultPlans);
  const [activeTab, setActiveTab] = useState("subscription");
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  const subscriptionForm = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      buttonText: "",
    },
  });

  const reportPricingForm = useForm<z.infer<typeof reportPricingFormSchema>>({
    resolver: zodResolver(reportPricingFormSchema),
    defaultValues: {
      minPrice: 9.99,
      maxPrice: 199.99,
      defaultPrice: 49.99,
    },
  });

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlanId(plan.id);
    subscriptionForm.reset({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      buttonText: plan.buttonText,
    });
  };

  const handleSavePlan = (values: z.infer<typeof subscriptionFormSchema>) => {
    if (editingPlanId) {
      const updatedPlans = plans.map((plan) =>
        plan.id === editingPlanId
          ? {
              ...plan,
              name: values.name,
              description: values.description,
              price: values.price,
              buttonText: values.buttonText,
            }
          : plan,
      );

      setPlans(updatedPlans);
      setEditingPlanId(null);
      subscriptionForm.reset();
    }
  };

  const handleSaveReportPricing = (
    values: z.infer<typeof reportPricingFormSchema>,
  ) => {
    // In a real app, this would save to a database
    console.log("Report pricing settings saved:", values);
    // Show success message
    alert("Report pricing settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Pricing</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscription">Subscription Plans</TabsTrigger>
          <TabsTrigger value="reports">Report Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`${plan.popular ? "border-primary" : ""}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    {editingPlanId === plan.id ? (
                      <Form {...subscriptionForm}>
                        <form
                          onSubmit={subscriptionForm.handleSubmit(
                            handleSavePlan,
                          )}
                          className="space-y-4 w-full"
                        >
                          <FormField
                            control={subscriptionForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Plan Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={subscriptionForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={subscriptionForm.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        type="number"
                                        step="0.01"
                                        className="pl-8"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={subscriptionForm.control}
                              name="buttonText"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Button Text</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setEditingPlanId(null)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">
                              <Save className="h-4 w-4 mr-2" /> Save
                            </Button>
                          </div>
                        </form>
                      </Form>
                    ) : (
                      <>
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-4">
                            <span className="text-3xl font-bold">
                              ${plan.price.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground ml-2">
                              /{plan.period}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPlan(plan)}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.included ? "" : "text-muted-foreground"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="w-full text-center">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Pricing Settings</CardTitle>
              <CardDescription>
                Configure the pricing parameters for individual research
                reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...reportPricingForm}>
                <form
                  onSubmit={reportPricingForm.handleSubmit(
                    handleSaveReportPricing,
                  )}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={reportPricingForm.control}
                      name="minPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Price ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                step="0.01"
                                className="pl-8"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            The lowest price allowed for any report
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={reportPricingForm.control}
                      name="maxPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Price ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                step="0.01"
                                className="pl-8"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            The highest price allowed for any report
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={reportPricingForm.control}
                      name="defaultPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Price ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                step="0.01"
                                className="pl-8"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            The default price for new reports
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" /> Save Settings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Pricing Actions</CardTitle>
              <CardDescription>
                Apply pricing changes to multiple reports at once.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Discount All Reports</h4>
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label className="text-sm font-medium mb-1 block">
                        Discount Percentage
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          min="1"
                          max="99"
                          placeholder="10"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-2.5 text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                    <Button>Apply Discount</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Increase All Prices</h4>
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label className="text-sm font-medium mb-1 block">
                        Increase Percentage
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          min="1"
                          max="99"
                          placeholder="5"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-2.5 text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                    <Button>Apply Increase</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagePricing;
