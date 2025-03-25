import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SubscriptionPlansSection from "@/components/subscription/SubscriptionPlansSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SubscriptionPage = () => {
  const handleSelectPlan = (planId: string) => {
    console.log(`Subscription plan selected: ${planId}`);
    // In a real app, this would add the subscription plan to cart or start checkout
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Research Subscription Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get unlimited access to expert research reports and consultations
            with our flexible subscription options
          </p>
        </div>

        {/* Subscription Plans */}
        <section className="mb-16">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual Billing (Save 20%)
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly">
              <SubscriptionPlansSection onSelectPlan={handleSelectPlan} />
            </TabsContent>

            <TabsContent value="annual">
              <SubscriptionPlansSection
                onSelectPlan={handleSelectPlan}
                plans={[
                  {
                    id: "free-annual",
                    name: "Free",
                    description: "Basic access to limited research content",
                    price: 0,
                    period: "yearly",
                    buttonText: "Start Free",
                    features: [
                      {
                        name: "Access to 5 free reports",
                        included: true,
                      },
                      {
                        name: "Limited downloads (3/month)",
                        included: true,
                      },
                      { name: "Basic search functionality", included: true },
                      { name: "Community forum access", included: true },
                      {
                        name: "Expert consultations",
                        included: false,
                        tooltip: "Available in Premium plan",
                      },
                      {
                        name: "Early access to new reports",
                        included: false,
                      },
                      { name: "Advanced analytics dashboard", included: false },
                    ],
                  },
                  {
                    id: "premium-annual",
                    name: "Premium",
                    description:
                      "Full access to all reports and expert consultations",
                    price: 959.9, // 20% off monthly price * 12
                    period: "yearly",
                    popular: true,
                    buttonText: "Subscribe Now",
                    features: [
                      {
                        name: "Unlimited access to all reports",
                        included: true,
                      },
                      { name: "Unlimited downloads", included: true },
                      { name: "Advanced search & filters", included: true },
                      {
                        name: "Priority email & phone support",
                        included: true,
                      },
                      {
                        name: "Monthly expert consultations",
                        included: true,
                        tooltip: "2 hours of expert consultation per month",
                      },
                      { name: "Early access to new reports", included: true },
                      { name: "Advanced analytics dashboard", included: true },
                    ],
                  },
                ]}
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* Plan Comparison */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-8">
            Plan Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 w-1/3">Features</th>
                  <th className="text-center p-4 w-1/3">
                    <div className="font-bold text-lg">Free</div>
                    <div className="text-muted-foreground">$0/month</div>
                  </th>
                  <th className="text-center p-4 w-1/3 bg-primary/5 rounded-t-lg">
                    <div className="font-bold text-lg text-primary">
                      Premium
                    </div>
                    <div className="text-muted-foreground">$99.99/month</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Research Reports Access</td>
                  <td className="text-center p-4">5 free reports</td>
                  <td className="text-center p-4 bg-primary/5">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Monthly Downloads</td>
                  <td className="text-center p-4">3 reports</td>
                  <td className="text-center p-4 bg-primary/5">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Search Functionality</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4 bg-primary/5">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Customer Support</td>
                  <td className="text-center p-4">Community forum</td>
                  <td className="text-center p-4 bg-primary/5">
                    Priority email & phone
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">
                    <div className="flex items-center">
                      Expert Consultations
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px]">
                              One-on-one sessions with research experts
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                  <td className="text-center p-4">Not included</td>
                  <td className="text-center p-4 bg-primary/5">
                    2 hours/month
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">New Reports Access</td>
                  <td className="text-center p-4">None</td>
                  <td className="text-center p-4 bg-primary/5">Early access</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Analytics Tools</td>
                  <td className="text-center p-4">Not included</td>
                  <td className="text-center p-4 bg-primary/5">
                    Advanced dashboard
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="p-4"></td>
                  <td className="text-center p-4">
                    <Button
                      variant="outline"
                      onClick={() => handleSelectPlan("free")}
                    >
                      Select Free
                    </Button>
                  </td>
                  <td className="text-center p-4 bg-primary/5 rounded-b-lg">
                    <Button onClick={() => handleSelectPlan("premium")}>
                      Select Premium
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What's included in the Free plan?
                </AccordionTrigger>
                <AccordionContent>
                  The Free plan includes access to 5 selected research reports,
                  the ability to download up to 3 reports per month, basic
                  search functionality, and community forum access. It's perfect
                  for individuals who want to explore our platform before
                  committing to a paid plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How do expert consultations work?
                </AccordionTrigger>
                <AccordionContent>
                  With the Premium plan, you receive 2 hours of consultation
                  time per month with our research experts. You can schedule
                  these sessions through our platform, choosing from available
                  time slots. Consultations can be conducted via video call or
                  in-app messaging, depending on your preference.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I cancel my subscription at any time?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your subscription at any time. If you
                  cancel, you'll continue to have access to your subscription
                  benefits until the end of your current billing period. We
                  don't offer refunds for partial subscription periods.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Is there a free trial available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 14-day free trial for both our Free and
                  Premium plans. No credit card is required to start your trial.
                  You'll receive a reminder before your trial ends, at which
                  point you can choose to subscribe or cancel.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  What happens if I exceed my download limit?
                </AccordionTrigger>
                <AccordionContent>
                  Free plan users have a limit of 3 report downloads per month.
                  If you reach this limit, you'll need to wait until the next
                  month for the limit to reset, or you can upgrade to the
                  Premium plan for unlimited downloads.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Can I switch between plans?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can switch between the Free and Premium plans at any
                  time. If you upgrade, the change will take effect immediately,
                  and you'll be charged for the Premium plan. If you downgrade
                  from Premium to Free, the change will take effect at the start
                  of your next billing cycle.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            What Our Subscribers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial1"
                    alt="User avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">
                    Marketing Director
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The Premium subscription has been invaluable for our market
                research. The expert consultations alone are worth the price,
                providing insights we couldn't get elsewhere."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial2"
                    alt="User avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">
                    Investment Analyst
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I've been a Free subscriber for six months, and the quality of
                research reports is exceptional. It's helped me make more
                informed investment decisions."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial3"
                    alt="User avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">
                    Academic Researcher
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The annual Premium subscription offers incredible value. The
                unlimited access to reports and expert consultations has
                significantly accelerated my research projects."
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who rely on our research platform
            for accurate, timely, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleSelectPlan("free")}
            >
              Try Free Plan
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/20"
              onClick={() => handleSelectPlan("premium")}
            >
              Try Premium Plan
            </Button>
          </div>
          <p className="text-sm mt-4">
            14-day free trial. No credit card required.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
