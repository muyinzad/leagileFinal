import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { BarChart3, Database, FileSpreadsheet, ArrowRight } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import DataAnalysis from "../components/services/DataAnalysis";
import DataCollection from "../components/services/DataCollection";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(
    location.state?.activeTab || "overview",
  );

  return (
    <MainLayout isLoggedIn={false} cartItemCount={0}>
      <div className="container mx-auto py-12 px-4">
        {activeTab === "overview" && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Our Research Services</h1>
            <p className="text-xl text-gray-700 mb-12">
              We offer comprehensive research services to help you gather,
              analyze, and interpret data for your academic, business, or policy
              needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Data Analysis</CardTitle>
                  <CardDescription>
                    Extract meaningful insights from your research data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Our expert team provides comprehensive data analysis
                    services to help you understand patterns, test hypotheses,
                    and visualize results.
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li>• Statistical analysis</li>
                    <li>• Data visualization</li>
                    <li>• Predictive modeling</li>
                    <li>• Machine learning</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("analysis")}
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Data Collection</CardTitle>
                  <CardDescription>
                    Gather high-quality data for your research needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We provide comprehensive data collection services tailored
                    to your specific research requirements and objectives.
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li>• Surveys & questionnaires</li>
                    <li>• Interviews & focus groups</li>
                    <li>• Field data collection</li>
                    <li>• Database mining</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("collection")}
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold">
                Why Choose Our Research Services?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
                  <p>
                    Our research team consists of PhD-level experts with
                    extensive experience in various fields including data
                    science, economics, social sciences, and more.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3">
                    Rigorous Methodology
                  </h3>
                  <p>
                    We follow established research methodologies and maintain
                    the highest standards of academic and professional integrity
                    in all our work.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3">
                    Customized Approach
                  </h3>
                  <p>
                    We tailor our research services to your specific needs,
                    ensuring that you receive relevant and actionable insights
                    for your unique context.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3">
                    Comprehensive Support
                  </h3>
                  <p>
                    From initial consultation to final delivery, we provide
                    comprehensive support throughout the research process,
                    including regular updates and consultations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analysis" && (
          <>
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setActiveTab("overview")}
                className="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Services
              </Button>
            </div>
            <DataAnalysis />
          </>
        )}

        {activeTab === "collection" && (
          <>
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setActiveTab("overview")}
                className="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Services
              </Button>
            </div>
            <DataCollection />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
