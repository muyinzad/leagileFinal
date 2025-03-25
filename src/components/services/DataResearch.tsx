import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  CheckCircle,
  FileText,
  Search,
  Users,
  ArrowRight,
  BarChart3,
  Database,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DataResearch = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Data Research Services</h1>
          <p className="text-lg text-gray-700 mb-8">
            Our specialized research team conducts comprehensive data research
            to support your academic, business, or policy objectives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-md text-center p-6">
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Literature Review</h3>
              <p className="text-gray-600">
                Comprehensive analysis of existing research and publications in
                your field of interest.
              </p>
            </Card>

            <Card className="shadow-md text-center p-6">
              <div className="flex justify-center mb-4">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secondary Research</h3>
              <p className="text-gray-600">
                Collection and analysis of existing data from reliable sources
                to answer your research questions.
              </p>
            </Card>

            <Card className="shadow-md text-center p-6">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Expert Consultation
              </h3>
              <p className="text-gray-600">
                Direct access to domain experts who can provide insights and
                guidance on your research topics.
              </p>
            </Card>
          </div>

          <Card className="shadow-md mb-12">
            <CardHeader>
              <CardTitle>Our Research Methodology</CardTitle>
              <CardDescription>
                A systematic approach to data research
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Define Research Objectives
                    </h3>
                    <p className="text-gray-700">
                      We work with you to clearly define your research questions
                      and objectives to ensure our research addresses your
                      specific needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Source Identification
                    </h3>
                    <p className="text-gray-700">
                      Our researchers identify and evaluate credible sources of
                      information relevant to your research topic.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Data Collection & Analysis
                    </h3>
                    <p className="text-gray-700">
                      We systematically collect, organize, and analyze
                      information from various sources to identify patterns and
                      insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Synthesis & Reporting
                    </h3>
                    <p className="text-gray-700">
                      We synthesize findings into comprehensive reports with
                      clear conclusions and actionable recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Review & Refinement
                    </h3>
                    <p className="text-gray-700">
                      We review findings with you and refine our research based
                      on your feedback and emerging questions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-slate-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Research Areas</h2>
            <p className="mb-6">
              Our research team specializes in various domains including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Market and industry analysis",
                "Academic literature reviews",
                "Policy and regulatory research",
                "Competitive intelligence",
                "Technology trends and forecasting",
                "Consumer behavior and preferences",
                "Environmental and sustainability research",
                "Healthcare and medical research",
              ].map((area, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button size="lg" onClick={() => navigate("/checkout")}>
                Request Research Service
              </Button>
            </div>
          </div>

          <Card className="shadow-md mb-12">
            <CardHeader>
              <CardTitle>Our Integrated Research Services</CardTitle>
              <CardDescription>
                How our research, analysis, and data collection work together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <Database className="h-5 w-5 text-primary mr-2" />
                      <CardTitle className="text-lg">Data Collection</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">
                      We gather high-quality data through surveys, interviews,
                      field research, and database mining.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center"
                      onClick={() =>
                        navigate("/services", {
                          state: { activeTab: "collection" },
                        })
                      }
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <Search className="h-5 w-5 text-primary mr-2" />
                      <CardTitle className="text-lg">Data Research</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">
                      We conduct comprehensive research to identify patterns,
                      trends, and insights from various sources.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center"
                      onClick={() => navigate("/data-research")}
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <BarChart3 className="h-5 w-5 text-primary mr-2" />
                      <CardTitle className="text-lg">Data Analysis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">
                      We transform raw data into actionable insights through
                      statistical analysis and visualization.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center"
                      onClick={() =>
                        navigate("/services", {
                          state: { activeTab: "analysis" },
                        })
                      }
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <p className="text-gray-700 mb-3">
                  Need a comprehensive research solution?
                </p>
                <Button onClick={() => navigate("/experts")}>
                  Consult with our Research Experts
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How long does a typical research project take?",
                  answer:
                    "The timeline varies based on scope and complexity. Small projects may take 2-3 weeks, while comprehensive research might require 1-3 months. We'll provide a specific timeline during our initial consultation.",
                },
                {
                  question: "What deliverables can I expect?",
                  answer:
                    "You'll receive a comprehensive research report with executive summary, methodology, findings, analysis, and recommendations. We also provide all source materials, data sets, and supporting documentation.",
                },
                {
                  question: "Can you work with confidential information?",
                  answer:
                    "Yes, we maintain strict confidentiality protocols. All our researchers sign NDAs, and we can accommodate any specific confidentiality requirements you may have.",
                },
                {
                  question: "Do you offer ongoing research support?",
                  answer:
                    "Yes, we offer continuous research partnerships with regular updates and reports. This is ideal for tracking evolving trends, markets, or research areas.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataResearch;
