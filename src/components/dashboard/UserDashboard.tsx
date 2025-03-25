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
  // State for expert application form
  const [expertiseArea, setExpertiseArea] = useState("market-research");
  const [experienceYears, setExperienceYears] = useState("5-10");
  const [availabilityOptions, setAvailabilityOptions] = useState({
    weekdays: true,
    weekends: false,
    mornings: true,
    evenings: true,
  });
  const [expertiseLevel, setExpertiseLevel] = useState("advanced");
  const [consultationFormat, setConsultationFormat] = useState("both");

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
    {
      label: "Upcoming Consultations",
      value: upcomingConsultations.length,
      icon: <Calendar className="h-5 w-5 text-emerald-500" />,
    },
    {
      label: "Recently Viewed",
      value: recentlyViewedReports.length,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
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
                  onClick={() => setActiveTab("become-expert")}
                >
                  <Award className="h-4 w-4" />
                  Become an Expert
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
              <TabsTrigger
                value="consultations"
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Consultations</span>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest interactions with research reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      ...recentlyViewedReports,
                      ...downloadedReports.slice(0, 1),
                    ]
                      .sort((a, b) => {
                        const dateA = new Date(a.viewedDate || a.downloadDate);
                        const dateB = new Date(b.viewedDate || b.downloadDate);
                        return dateB.getTime() - dateA.getTime();
                      })
                      .slice(0, 4)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="bg-primary/10 p-2 rounded-full">
                            {"viewedDate" in item ? (
                              <Clock className="h-5 w-5 text-blue-500" />
                            ) : (
                              <Download className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {"viewedDate" in item
                                ? `Viewed on ${new Date(item.viewedDate).toLocaleDateString()}`
                                : `Downloaded on ${new Date(item.downloadDate).toLocaleDateString()}`}
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
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              {/* Upcoming Consultations */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    Upcoming Consultations
                  </CardTitle>
                  <CardDescription>
                    Your scheduled expert sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingConsultations.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingConsultations.map((consultation, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium">
                              {consultation.expertName}
                            </p>
                            <Badge variant="outline">
                              {consultation.topic}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(consultation.date).toLocaleDateString()}{" "}
                              at {consultation.time}
                            </span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-1" /> Join
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="font-medium mb-1">No Upcoming Sessions</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Schedule a consultation with an expert
                      </p>
                      <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-1" /> Book Session
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Consultations
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

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Consultations
                    </CardTitle>
                    <CardDescription>
                      Your scheduled expert consultation sessions
                    </CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" /> Book New
                    Consultation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingConsultations.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Expert</TableHead>
                          <TableHead>Topic</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingConsultations.map((consultation) => (
                          <TableRow key={consultation.id}>
                            <TableCell className="font-medium">
                              {consultation.expertName}
                            </TableCell>
                            <TableCell>{consultation.topic}</TableCell>
                            <TableCell>
                              {new Date(consultation.date).toLocaleDateString()}{" "}
                              at {consultation.time}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  <Calendar className="h-4 w-4 mr-1" /> Add to
                                  Calendar
                                </Button>
                                <Button size="sm">
                                  <MessageSquare className="h-4 w-4 mr-1" />{" "}
                                  Join
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No Upcoming Consultations
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      You don't have any scheduled consultations with experts.
                      Book a session to get personalized insights.
                    </p>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" /> Book a
                      Consultation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Consultations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Past Consultations</CardTitle>
                <CardDescription>
                  Review your previous expert sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">No Past Consultations</h3>
                  <p className="text-sm text-muted-foreground">
                    Your completed consultations will appear here
                  </p>
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
                      <Clock className="h-5 w-5" />
                      Recently Viewed
                    </CardTitle>
                    <CardDescription>
                      Reports you've recently viewed or accessed
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search history..."
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
                        <TableHead>Viewed On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentlyViewedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {report.title}
                          </TableCell>
                          <TableCell>
                            {new Date(report.viewedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Again
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

          {/* Become Expert Tab */}
          <TabsContent value="become-expert" className="space-y-4">
            <Card className="bg-gradient-to-br from-background to-muted">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Become a Research Expert</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Share your expertise and earn by providing valuable insights
                  and consultations to our research community.
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
                              htmlFor="expertise"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              Area of Expertise
                            </Label>
                            <Select
                              defaultValue={expertiseArea}
                              onValueChange={setExpertiseArea}
                            >
                              <SelectTrigger id="expertise" className="mt-1.5">
                                <SelectValue placeholder="Select your expertise" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="market-research">
                                  Market Research
                                </SelectItem>
                                <SelectItem value="finance">
                                  Finance & Economics
                                </SelectItem>
                                <SelectItem value="technology">
                                  Technology & Innovation
                                </SelectItem>
                                <SelectItem value="healthcare">
                                  Healthcare & Life Sciences
                                </SelectItem>
                                <SelectItem value="education">
                                  Education & Academia
                                </SelectItem>
                                <SelectItem value="sustainability">
                                  Sustainability & ESG
                                </SelectItem>
                                <SelectItem value="consumer-behavior">
                                  Consumer Behavior
                                </SelectItem>
                                <SelectItem value="other">
                                  Other Specialty
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label
                              htmlFor="experience"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <Clock3 className="h-4 w-4 text-muted-foreground" />
                              Years of Experience
                            </Label>
                            <Select
                              defaultValue={experienceYears}
                              onValueChange={setExperienceYears}
                            >
                              <SelectTrigger id="experience" className="mt-1.5">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-3">1-3 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label
                              htmlFor="rate"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              Hourly Consultation Rate ($)
                            </Label>
                            <Input
                              id="rate"
                              type="number"
                              placeholder="100"
                              min="50"
                              className="mt-1.5"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-muted-foreground" />
                              Expertise Level
                            </Label>
                            <RadioGroup
                              defaultValue={expertiseLevel}
                              onValueChange={setExpertiseLevel}
                              className="mt-2 grid grid-cols-1 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="intermediate"
                                  id="intermediate"
                                />
                                <Label
                                  htmlFor="intermediate"
                                  className="cursor-pointer"
                                >
                                  Intermediate
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="advanced"
                                  id="advanced"
                                />
                                <Label
                                  htmlFor="advanced"
                                  className="cursor-pointer"
                                >
                                  Advanced
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="expert" id="expert" />
                                <Label
                                  htmlFor="expert"
                                  className="cursor-pointer"
                                >
                                  Expert/Thought Leader
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label className="text-sm font-medium flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              Consultation Format
                            </Label>
                            <RadioGroup
                              defaultValue={consultationFormat}
                              onValueChange={setConsultationFormat}
                              className="mt-2 grid grid-cols-1 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="written" id="written" />
                                <Label
                                  htmlFor="written"
                                  className="cursor-pointer"
                                >
                                  Written Consultations Only
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="video" id="video" />
                                <Label
                                  htmlFor="video"
                                  className="cursor-pointer"
                                >
                                  Video Calls Only
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="both" id="both" />
                                <Label
                                  htmlFor="both"
                                  className="cursor-pointer"
                                >
                                  Both Formats
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="bio"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Professional Bio
                        </Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us about your professional background, research focus, and what makes your expertise valuable to our users..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="credentials"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Award className="h-4 w-4 text-muted-foreground" />
                          Credentials & Certifications
                        </Label>
                        <textarea
                          id="credentials"
                          className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="List your relevant credentials, certifications, academic qualifications, and published research..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Availability
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="weekdays"
                              checked={availabilityOptions.weekdays}
                              onCheckedChange={(checked) =>
                                setAvailabilityOptions({
                                  ...availabilityOptions,
                                  weekdays: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="weekdays"
                              className="text-sm cursor-pointer"
                            >
                              Weekdays
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="weekends"
                              checked={availabilityOptions.weekends}
                              onCheckedChange={(checked) =>
                                setAvailabilityOptions({
                                  ...availabilityOptions,
                                  weekends: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="weekends"
                              className="text-sm cursor-pointer"
                            >
                              Weekends
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mornings"
                              checked={availabilityOptions.mornings}
                              onCheckedChange={(checked) =>
                                setAvailabilityOptions({
                                  ...availabilityOptions,
                                  mornings: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="mornings"
                              className="text-sm cursor-pointer"
                            >
                              Mornings
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="evenings"
                              checked={availabilityOptions.evenings}
                              onCheckedChange={(checked) =>
                                setAvailabilityOptions({
                                  ...availabilityOptions,
                                  evenings: !!checked,
                                })
                              }
                            />
                            <Label
                              htmlFor="evenings"
                              className="text-sm cursor-pointer"
                            >
                              Evenings
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          Upload Documents (Optional)
                        </Label>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm font-medium">Resume/CV</p>
                            <p className="text-xs text-muted-foreground">
                              PDF, DOC up to 5MB
                            </p>
                          </div>
                          <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              Sample Research
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-span-1">
                    <div className="bg-card rounded-lg border shadow-sm p-6 h-full">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-amber-500" />
                        Benefits of Being an Expert
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex gap-2">
                          <DollarSign className="h-5 w-5 text-green-500 shrink-0" />
                          <span className="text-sm">
                            Earn competitive rates for your expertise and
                            consultations
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <Users className="h-5 w-5 text-blue-500 shrink-0" />
                          <span className="text-sm">
                            Connect with a global network of researchers and
                            professionals
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <Award className="h-5 w-5 text-purple-500 shrink-0" />
                          <span className="text-sm">
                            Build your professional reputation and authority
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <Calendar className="h-5 w-5 text-orange-500 shrink-0" />
                          <span className="text-sm">
                            Flexible schedule - you choose when to offer
                            consultations
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <FileText className="h-5 w-5 text-teal-500 shrink-0" />
                          <span className="text-sm">
                            Opportunity to publish your research to a wider
                            audience
                          </span>
                        </li>
                      </ul>

                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-medium text-sm mb-2">
                          Expert Verification Process
                        </h4>
                        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                          <li>Submit your application</li>
                          <li>Credential verification (1-2 days)</li>
                          <li>Brief video interview</li>
                          <li>Profile approval and onboarding</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button className="w-full sm:w-auto" size="lg">
                  <Award className="mr-2 h-4 w-4" /> Submit Application
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
