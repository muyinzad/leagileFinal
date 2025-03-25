import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";

const DonationPage = () => {
  const [amount, setAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<string>("one-time");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission logic here
    alert(`Thank you for your ${donationType} donation of $${amount}!`);
  };

  return (
    <MainLayout isLoggedIn={false} cartItemCount={0}>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Support Our Research
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Your donations help us continue providing high-quality research and
            support our experts in their work.
          </p>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Make a Donation</CardTitle>
              <CardDescription>
                Choose an amount and donation type to support our research
                initiatives.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="donation-type">Donation Type</Label>
                    <RadioGroup
                      defaultValue="one-time"
                      value={donationType}
                      onValueChange={setDonationType}
                      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time">One-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="annual" id="annual" />
                        <Label htmlFor="annual">Annual</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Donation Amount ($)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[25, 50, 100, 250].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={
                            amount === value.toString() ? "default" : "outline"
                          }
                          onClick={() => setAmount(value.toString())}
                          className="h-12"
                        >
                          ${value}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Label
                        htmlFor="custom-amount"
                        className="whitespace-nowrap"
                      >
                        Custom Amount:
                      </Label>
                      <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="Other amount"
                          className="pl-7"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                  </div>
                </div>

                <CardFooter className="flex justify-end pt-6 px-0">
                  <Button type="submit" size="lg" disabled={!amount}>
                    {donationType === "one-time" ? "Donate" : "Subscribe"} $
                    {amount}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 bg-slate-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              How Your Donation Helps
            </h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>Fund new research initiatives in emerging fields</li>
              <li>Support our expert researchers and analysts</li>
              <li>Improve our platform and research tools</li>
              <li>Make research more accessible to those who need it most</li>
              <li>Sponsor educational programs and workshops</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DonationPage;
