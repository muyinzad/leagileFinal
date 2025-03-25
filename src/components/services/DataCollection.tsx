import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  ClipboardList,
  Database,
  FileSpreadsheet,
  Users,
  ArrowRight,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DataCollection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Data Collection Services</h1>
          <p className="text-lg text-gray-700 mb-8">
            We provide comprehensive data collection services tailored to your
            specific research requirements and objectives.
          </p>

          <Tabs defaultValue="methods" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="methods">Collection Methods</TabsTrigger>
              <TabsTrigger value="process">Our Process</TabsTrigger>
              <TabsTrigger value="types">Data Types</TabsTrigger>
            </TabsList>
            <TabsContent value="methods" className="p-6 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">
                Our Data Collection Methods
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex">
                  <Users className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">
                      Surveys & Questionnaires
                    </h3>
                    <p className="text-gray-600">
                      Custom-designed surveys to gather specific information
                      from target populations.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <ClipboardList className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">
                      Interviews & Focus Groups
                    </h3>
                    <p className="text-gray-600">
                      In-depth conversations with individuals or groups to
                      gather qualitative insights.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Database className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Database Mining</h3>
                    <p className="text-gray-600">
                      Extraction of relevant data from existing databases and
                      repositories.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <FileSpreadsheet className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Field Data Collection</h3>
                    <p className="text-gray-600">
                      On-site collection of data through observations,
                      measurements, and sampling.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="process" className="p-6 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">
                Our Data Collection Process
              </h2>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="font-medium">Requirements Analysis</h3>
                    <p className="text-gray-600">
                      We work with you to understand your research objectives
                      and data requirements.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="font-medium">Methodology Design</h3>
                    <p className="text-gray-600">
                      We design a data collection methodology tailored to your
                      specific needs.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="font-medium">Tool Development</h3>
                    <p className="text-gray-600">
                      We create or configure the necessary tools for data
                      collection (surveys, forms, etc.).
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h3 className="font-medium">Data Collection</h3>
                    <p className="text-gray-600">
                      We systematically collect data according to the
                      established methodology.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    5
                  </span>
                  <div>
                    <h3 className="font-medium">Quality Assurance</h3>
                    <p className="text-gray-600">
                      We verify and validate the collected data to ensure
                      accuracy and completeness.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    6
                  </span>
                  <div>
                    <h3 className="font-medium">Data Processing & Delivery</h3>
                    <p className="text-gray-600">
                      We organize and format the data for easy analysis and
                      deliver it in your preferred format.
                    </p>
                  </div>
                </li>
              </ol>
            </TabsContent>
            <TabsContent value="types" className="p-6 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">
                Types of Data We Collect
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quantitative Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Numerical measurements</li>
                      <li>Statistical information</li>
                      <li>Survey responses (closed-ended)</li>
                      <li>Experimental data</li>
                      <li>Time series data</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Qualitative Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Interview transcripts</li>
                      <li>Focus group discussions</li>
                      <li>Open-ended survey responses</li>
                      <li>Observational notes</li>
                      <li>Case studies</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-slate-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Request Data Collection Services
            </h2>
            <p className="mb-6">
              Need specific data for your research project? Our team can help
              you collect high-quality, relevant data tailored to your
              requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/checkout")}>
                Request Data Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/experts")}
              >
                Consult with an Expert
              </Button>
            </div>
          </div>

          <Card className="shadow-md mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Requirements Specification
              </CardTitle>
              <CardDescription>
                How to prepare your data collection requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  To ensure we collect exactly the data you need, please
                  consider the following when submitting your requirements:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">
                        1
                      </span>
                      Research Objectives
                    </h3>
                    <p className="text-sm text-gray-600">
                      Clearly define what questions you're trying to answer with
                      this data.
                    </p>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">
                        2
                      </span>
                      Target Population
                    </h3>
                    <p className="text-sm text-gray-600">
                      Specify the demographic or group from which you need data
                      collected.
                    </p>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">
                        3
                      </span>
                      Data Points
                    </h3>
                    <p className="text-sm text-gray-600">
                      List the specific variables or information you need to
                      collect.
                    </p>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">
                        4
                      </span>
                      Timeline & Budget
                    </h3>
                    <p className="text-sm text-gray-600">
                      Indicate your project timeframe and budget constraints.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => navigate("/data-research")}
                  >
                    Explore our research methodology
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md mb-12">
            <CardHeader>
              <CardTitle>Industries We Serve</CardTitle>
              <CardDescription>
                Specialized data collection across various sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Academic Research",
                  "Healthcare & Medical",
                  "Market Research",
                  "Social Sciences",
                  "Environmental Studies",
                  "Public Policy",
                  "Business Intelligence",
                  "Technology & Innovation",
                  "Education",
                ].map((industry, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 p-3 rounded text-center"
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How do you ensure data quality and accuracy?",
                  answer:
                    "We implement rigorous quality control measures including data validation, cross-checking, and statistical verification. Our team follows established protocols to minimize errors and ensure reliable data collection.",
                },
                {
                  question:
                    "Can you collect data from specific demographic groups?",
                  answer:
                    "Yes, we can target specific demographics based on your research requirements. We have access to diverse participant pools and can implement screening criteria to ensure we collect data from your target population.",
                },
                {
                  question: "What data formats do you provide?",
                  answer:
                    "We can deliver data in various formats including Excel spreadsheets, CSV files, SQL databases, JSON, or custom formats based on your needs. We also provide clean, processed datasets ready for analysis.",
                },
                {
                  question:
                    "How do you handle data privacy and confidentiality?",
                  answer:
                    "We adhere to strict data privacy regulations including GDPR and CCPA. All collected data is anonymized when required, and we implement secure data storage and transfer protocols to protect sensitive information.",
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

export default DataCollection;
