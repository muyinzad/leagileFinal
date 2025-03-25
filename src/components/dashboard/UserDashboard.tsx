import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import {
  Download,
  Heart,
  Clock,
  BookOpen,
  Calendar,
  Star,
  MessageSquare,
  Award,
  Briefcase,
  GraduationCap,
  Clock3,
  DollarSign,
  Upload,
  FileText,
  Users,
  ChevronRight,
  Bell,
  BarChart,
  Settings,
  Search,
  Filter,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Database,
  ClipboardList,
} from "lucide-react";

interface UserDashboardProps {
  userName?: string;
  subscriptionType?: "Premium" | "Free" | "None";
  subscriptionEndDate?: string;
  downloadedReports?: {
    id: string;
    title: string;
    downloadDate: string;
    category: string;
  }[];
  wishlistedReports?: {
    id: string;
    title: string;
    price: number;
    addedDate: string;
  }[];
  upcomingConsultations?: {
    id: string;
    expertName: string;
    date: string;
    time: string;
    topic: string;
  }[];
  recentlyViewedReports?: {
    id: string;
    title: string;
    viewedDate: string;
  }[];
}

const UserDashboard = ({
  userName = "John Doe",
  subscriptionType = "Premium",
  subscriptionEndDate = "2023-12-31",
  downloadedReports = [
    {
      id: "1",
      title: "Market Analysis 2023",
      downloadDate: "2023-06-15",
      category: "Market Research",
    },
    {
      id: "2",
      title: "Emerging Technologies in Finance",
      downloadDate: "2023-05-22",
      category: "Finance",
    },
    {
      id: "3",
      title: "Consumer Behavior Trends",
      downloadDate: "2023-04-10",
      category: "Consumer Research",
    },
  ],
  wishlistedReports = [
    {
      id: "4",
      title: "Healthcare Industry Outlook",
      price: 49.99,
      addedDate: "2023-06-01",
    },
    {
      id: "5",
      title: "Renewable Energy Market Forecast",
      price: 59.99,
      addedDate: "2023-05-28",
    },
  ],
  upcomingConsultations = [
    {
      id: "1",
      expertName: "Dr. Sarah Johnson",
      date: "2023-07-15",
      time: "10:00 AM",
      topic: "Market Entry Strategy",
    },
  ],
  recentlyViewedReports = [
    {
      id: "6",
      title: "AI in Business Operations",
      viewedDate: "2023-06-18",
    },
    {
      id: "7",
      title: "Supply Chain Optimization",
      viewedDate: "2023-06-17",
    },
  ],
}: UserDashboardProps) => {
  // State for service request form
  const [serviceType, setServiceType] = useState("data-collection");

  // State for active tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calculate subscription usage (for progress bar)
  const daysLeft = Math.ceil(
    (new Date(subscriptionEndDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const totalDays = 30; // Assuming monthly subscription
  const usagePercentage = Math.max(
    0,
    Math.min(100, ((totalDays - daysLeft) / totalDays) * 100),
  );

  // Dashboard metrics
  const metrics = [
    {
      label: "Downloaded Reports",
      value: downloadedReports.length,
      icon: <Download className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "Saved Reports",
      value: wishlistedReports.length,
      icon: <Heart className="h-5 w-5 text-rose-500" />,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-xl">
                  {userName.charAt(0)}
                </span>
                <span>Welcome, {userName}</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your research reports and expert consultations
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-card rounded-lg border p-3 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">Subscription:</span>
                  <Badge
                    variant={
                      subscriptionType === "None" ? "outline" : "default"
                    }
                    className={
                      subscriptionType === "None"
                        ? "bg-muted"
                        : subscriptionType === "Free"
                          ? "bg-secondary text-secondary-foreground"
                          : ""
                    }
                  >
                    {subscriptionType === "None"
                      ? "No Active Plan"
                      : `${subscriptionType} Plan`}
                  </Badge>
                </div>
                {subscriptionType !== "None" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Valid until{" "}
                        {new Date(subscriptionEndDate).toLocaleDateString()}
                      </span>
                      <span className="font-medium">{daysLeft} days left</span>
                    </div>
                    <Progress value={usagePercentage} className="h-1.5" />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="gap-1"
                  onClick={() => setActiveTab("services")}
                >
                  <Database className="h-4 w-4" />
                  Request Services
                </Button>
                {subscriptionType === "None" ? (
                  <Button className="gap-1">
                    <Star className="h-4 w-4" />
                    Subscribe Now
                  </Button>
                ) : (
                  <Button variant="outline" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Manage Subscription
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 w-auto">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="downloads"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">Downloads</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden md:inline">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden md:inline">History</span>
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="flex items-center gap-2"
              >
                <Star className="h-4 w-4" />
                <span className="hidden md:inline">For You</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden md:inline">Services</span>
              </TabsTrigger>
            </TabsList>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Dashboard Overview Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {metric.label}
                      </p>
                      <p className="text-3xl font-bold">{metric.value}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      {metric.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Previously Downloaded Reports */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    Previously Downloaded Reports
                  </CardTitle>
                  <CardDescription>
                    Your recently downloaded research reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {downloadedReports.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Download className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Downloaded on{" "}
                            {new Date(item.downloadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Downloads
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Recommended Reports */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    Recommended For You
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Personalized research report recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Global Supply Chain Trends 2023
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Logistics & Operations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        Comprehensive analysis of global supply chain trends and
                        disruptions in 2023.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Digital Transformation in Banking
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Finance & Technology
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        How financial institutions are leveraging technology to
                        transform their operations.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Sustainable Business Practices
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Environmental Studies
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        Research on implementing sustainable practices in
                        business operations.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Downloads Tab */}
          <TabsContent value="downloads" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Downloaded Reports
                    </CardTitle>
                    <CardDescription>
                      Access your purchased and downloaded research reports
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search downloads..."
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Downloaded On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downloadedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {report.title}
                          </TableCell>
                          <TableCell>{report.category}</TableCell>
                          <TableCell>
                            {new Date(report.downloadDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-1" /> Download
                              </Button>
                              <Button variant="ghost" size="sm">
                                <BookOpen className="h-4 w-4 mr-1" /> Read
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View All Downloads
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Wishlist
                    </CardTitle>
                    <CardDescription>
                      Reports you've saved for later purchase
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search wishlist..."
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Added On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wishlistedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {report.title}
                          </TableCell>
                          <TableCell>${report.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {new Date(report.addedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              <Button size="sm">Add to Cart</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Download History
                    </CardTitle>
                    <CardDescription>
                      Reports you've previously downloaded
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search downloads..."
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Title</TableHead>
                        <TableHead>Downloaded On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downloadedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {report.title}
                          </TableCell>
                          <TableCell>
                            {new Date(report.downloadDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Download Again
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Recommended For You
                    </CardTitle>
                    <CardDescription>
                      Personalized research report recommendations based on your
                      interests
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Most Relevant</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Recommendation Cards */}
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Global Supply Chain Trends 2023
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Logistics & Operations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        Comprehensive analysis of global supply chain trends and
                        disruptions in 2023.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Digital Transformation in Banking
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Finance & Technology
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        How financial institutions are leveraging technology to
                        transform their operations.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Sustainable Business Practices
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Environmental Studies
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        Research on implementing sustainable practices in
                        business operations.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        AI Implementation Strategies
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Technology & Innovation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        Strategic approaches to implementing AI solutions in
                        enterprise environments.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Consumer Behavior Analysis
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Market Research
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        In-depth analysis of changing consumer preferences and
                        purchasing patterns.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Healthcare Innovation Trends
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Healthcare & Medicine
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2">
                        Emerging technologies and approaches transforming the
                        healthcare industry.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card className="bg-gradient-to-br from-background to-muted">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Research Services</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Request data collection and analysis services tailored to your
                  research needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="service-type"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <Database className="h-4 w-4 text-muted-foreground" />
                              Service Type
                            </Label>
                            <Select
                              defaultValue={serviceType}
                              onValueChange={setServiceType}
                            >
                              <SelectTrigger
                                id="service-type"
                                className="mt-1.5"
                              >
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="data-collection">
                                  Data Collection
                                </SelectItem>
                                <SelectItem value="data-analysis">
                                  Data Analysis
                                </SelectItem>
                                <SelectItem value="both">
                                  Both Collection & Analysis
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label
                              htmlFor="timeline"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <Clock3 className="h-4 w-4 text-muted-foreground" />
                              Project Timeline
                            </Label>
                            <Select defaultValue="standard">
                              <SelectTrigger id="timeline" className="mt-1.5">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="urgent">
                                  Urgent (1-2 weeks)
                                </SelectItem>
                                <SelectItem value="standard">
                                  Standard (3-4 weeks)
                                </SelectItem>
                                <SelectItem value="extended">
                                  Extended (5+ weeks)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label
                              htmlFor="budget"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              Budget Range ($)
                            </Label>
                            <Select defaultValue="medium">
                              <SelectTrigger id="budget" className="mt-1.5">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">
                                  $500 - $1,000
                                </SelectItem>
                                <SelectItem value="medium">
                                  $1,000 - $5,000
                                </SelectItem>
                                <SelectItem value="high">
                                  $5,000 - $10,000
                                </SelectItem>
                                <SelectItem value="enterprise">
                                  $10,000+
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {serviceType === "data-collection" ||
                          serviceType === "both" ? (
                            <div>
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                                Data Collection Methods
                              </Label>
                              <div className="mt-2 grid grid-cols-1 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="surveys" defaultChecked />
                                  <Label
                                    htmlFor="surveys"
                                    className="text-sm cursor-pointer"
                                  >
                                    Surveys & Questionnaires
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="interviews" />
                                  <Label
                                    htmlFor="interviews"
                                    className="text-sm cursor-pointer"
                                  >
                                    Interviews & Focus Groups
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="field-data" />
                                  <Label
                                    htmlFor="field-data"
                                    className="text-sm cursor-pointer"
                                  >
                                    Field Data Collection
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="database" />
                                  <Label
                                    htmlFor="database"
                                    className="text-sm cursor-pointer"
                                  >
                                    Database Mining
                                  </Label>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {serviceType === "data-analysis" ||
                          serviceType === "both" ? (
                            <div>
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <BarChart className="h-4 w-4 text-muted-foreground" />
                                Analysis Types
                              </Label>
                              <div className="mt-2 grid grid-cols-1 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="statistical" defaultChecked />
                                  <Label
                                    htmlFor="statistical"
                                    className="text-sm cursor-pointer"
                                  >
                                    Statistical Analysis
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="visualization" defaultChecked />
                                  <Label
                                    htmlFor="visualization"
                                    className="text-sm cursor-pointer"
                                  >
                                    Data Visualization
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="predictive" />
                                  <Label
                                    htmlFor="predictive"
                                    className="text-sm cursor-pointer"
                                  >
                                    Predictive Modeling
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="machine-learning" />
                                  <Label
                                    htmlFor="machine-learning"
                                    className="text-sm cursor-pointer"
                                  >
                                    Machine Learning
                                  </Label>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="requirements"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Project Requirements
                        </Label>
                        <textarea
                          id="requirements"
                          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Describe your research objectives, target population, specific data points needed, and any other relevant requirements..."
                        />
                      </div>

                      <div className="pt-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          Upload Documents (Optional)
                        </Label>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm font-medium">Project Brief</p>
                            <p className="text-xs text-muted-foreground">
                              PDF, DOC up to 5MB
                            </p>
                          </div>
                          <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              Existing Data (if any)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              CSV, XLSX up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-span-1">
                    <div className="bg-card rounded-lg border shadow-sm p-6 h-full">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-500" />
                        Service Information
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Data Collection
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>
                                Custom-designed surveys and questionnaires
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>
                                Professional interview and focus group
                                facilitation
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>
                                Rigorous data validation and quality control
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Data Analysis
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>
                                Advanced statistical analysis techniques
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>
                                Interactive data visualizations and dashboards
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>
                                Comprehensive insights and recommendations
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium text-sm mb-2">
                            Process Timeline
                          </h4>
                          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                            <li>Initial consultation (1-2 days)</li>
                            <li>Project scoping and proposal (3-5 days)</li>
                            <li>Data collection/analysis execution</li>
                            <li>Results delivery and review</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button className="w-full sm:w-auto" size="lg">
                  <Database className="mr-2 h-4 w-4" /> Submit Request
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  Save as Draft
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
