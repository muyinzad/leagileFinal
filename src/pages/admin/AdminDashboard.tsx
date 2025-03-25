import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Users,
  FileText,
  Tag,
  DollarSign,
  LayoutDashboard,
} from "lucide-react";
import ManageReports from "./ManageReports";
import ManageCategories from "./ManageCategories";
import ManagePricing from "./ManagePricing";
import ManageExperts from "./ManageExperts";
import ViewAnalytics from "./ViewAnalytics";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Welcome, Admin</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="overview">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Tag className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="h-4 w-4 mr-2" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="experts">
            <Users className="h-4 w-4 mr-2" />
            Experts
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Subscribers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,024</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48,560</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +16% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Experts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +4 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title:
                        "Advanced Market Analysis: Emerging Trends in Technology",
                      author: "Dr. Jane Smith",
                      date: "2023-06-15",
                    },
                    {
                      title: "Healthcare Innovation: Post-Pandemic Strategies",
                      author: "Prof. Michael Chen",
                      date: "2023-06-12",
                    },
                    {
                      title: "Sustainable Energy: Market Outlook 2023-2030",
                      author: "Dr. Sarah Johnson",
                      date: "2023-06-10",
                    },
                    {
                      title: "Fintech Revolution: Banking Disruption Analysis",
                      author: "Alex Rivera, MBA",
                      date: "2023-06-08",
                    },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium truncate max-w-xs">
                          {report.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {report.author}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {report.date}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Selling Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "AI Implementation Strategies for Enterprise",
                      sales: 128,
                      revenue: "$11,520",
                    },
                    {
                      title: "Fintech Revolution: Banking Disruption Analysis",
                      sales: 96,
                      revenue: "$6,720",
                    },
                    {
                      title: "Healthcare Innovation: Post-Pandemic Strategies",
                      sales: 84,
                      revenue: "$5,040",
                    },
                    {
                      title: "Sustainable Energy: Market Outlook 2023-2030",
                      sales: 72,
                      revenue: "$5,760",
                    },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium truncate max-w-xs">
                          {report.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {report.sales} sales
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {report.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <ManageReports />
        </TabsContent>

        <TabsContent value="categories">
          <ManageCategories />
        </TabsContent>

        <TabsContent value="pricing">
          <ManagePricing />
        </TabsContent>

        <TabsContent value="experts">
          <ManageExperts />
        </TabsContent>

        <TabsContent value="analytics">
          <ViewAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
