import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Check } from "lucide-react";

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void;
}

const SubscriptionPlansSection: React.FC<SubscriptionPlansProps> = ({
  onSelectPlan,
}) => {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      period: "per month",
      description: "Essential access to research reports",
      features: [
        "Access to basic research reports",
        "Monthly newsletter",
        "Community forum access",
        "Basic search functionality",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$29.99",
      period: "per month",
      description: "Full access with expert consultation",
      features: [
        "Access to your research reports",
        "Downloads at discounted price",
        "Contacting experts",
        "Priority email & phone support",
        "Notification on latest research works",
        "Advanced filtering and search",
        "Personalized recommendations",
      ],
      buttonText: "Upgrade Now",
      popular: true,
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Subscription Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to access premium research reports and
            expert consultations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "border-primary shadow-lg" : "border-gray-200"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "" : "bg-gray-800 hover:bg-gray-700"}`}
                  onClick={() => onSelectPlan(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlansSection;
