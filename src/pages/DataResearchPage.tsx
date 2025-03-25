import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import MainLayout from "../components/layout/MainLayout";

const DataResearchPage = () => {
  return (
    <MainLayout isLoggedIn={false} cartItemCount={0}>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Data Research Services
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Our comprehensive data research services help organizations make
            informed decisions through high-quality data collection, analysis,
            and interpretation.
          </p>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Research Overview</CardTitle>
                  <CardDescription>
                    Learn about our comprehensive data research approach
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our data research services provide organizations with the
                    insights they need to make strategic decisions. We
                    specialize in collecting, analyzing, and interpreting data
                    across various domains including market research, consumer
                    behavior, economic trends, and industry-specific analytics.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card className="bg-slate-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Quantitative Research
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Statistical analysis, surveys, and numerical data
                          processing to identify patterns and trends.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Qualitative Research
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          In-depth interviews, focus groups, and observational
                          studies to understand motivations and behaviors.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Predictive Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Advanced modeling techniques to forecast trends and
                          anticipate future developments.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Data Visualization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Transforming complex data into clear, actionable
                          visual insights for better decision-making.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methodology">
              <Card>
                <CardHeader>
                  <CardTitle>Research Methodology</CardTitle>
                  <CardDescription>
                    Our systematic approach to data collection and analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We employ rigorous methodologies to ensure the highest
                    quality of research outcomes. Our process is designed to be
                    transparent, replicable, and tailored to each client's
                    specific needs and objectives.
                  </p>

                  <div className="space-y-6 mt-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        1. Research Design
                      </h3>
                      <p className="text-gray-700">
                        We begin by clearly defining research questions and
                        objectives, selecting appropriate methodologies, and
                        designing sampling strategies.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        2. Data Collection
                      </h3>
                      <p className="text-gray-700">
                        Using both primary and secondary sources, we gather
                        relevant data through surveys, interviews, observations,
                        and existing datasets.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        3. Data Processing
                      </h3>
                      <p className="text-gray-700">
                        Raw data is cleaned, validated, and organized to ensure
                        accuracy and reliability before analysis begins.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        4. Analysis & Interpretation
                      </h3>
                      <p className="text-gray-700">
                        We apply statistical techniques and analytical
                        frameworks to extract meaningful insights from the
                        processed data.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        5. Reporting & Recommendations
                      </h3>
                      <p className="text-gray-700">
                        Findings are presented in clear, actionable reports with
                        strategic recommendations tailored to your objectives.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="case-studies">
              <Card>
                <CardHeader>
                  <CardTitle>Case Studies</CardTitle>
                  <CardDescription>
                    Real-world examples of our research impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">
                      Market Entry Strategy for Tech Startup
                    </h3>
                    <p className="text-gray-700 mb-4">
                      We helped a technology startup identify optimal market
                      segments and entry points through comprehensive consumer
                      behavior analysis and competitive landscape mapping.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline">Read Full Case Study</Button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">
                      Healthcare Policy Impact Analysis
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Our research team analyzed the effects of new healthcare
                      policies on patient outcomes and provider operations
                      across multiple regions, informing strategic adjustments.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline">Read Full Case Study</Button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">
                      Consumer Trends in Sustainable Products
                    </h3>
                    <p className="text-gray-700 mb-4">
                      We conducted longitudinal research on changing consumer
                      preferences for sustainable products, helping a major
                      retailer reposition their product lines successfully.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline">Read Full Case Study</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Research Project?
            </h2>
            <p className="mb-6">
              Contact our team to discuss your specific research needs and
              objectives.
            </p>
            <Button size="lg">Request a Consultation</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DataResearchPage;
