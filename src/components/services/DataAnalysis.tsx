import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { CheckCircle, BarChart3, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DataAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Data Analysis Services</h1>
          <p className="text-lg text-gray-700 mb-8">
            Our expert team provides comprehensive data analysis services to
            help you extract meaningful insights from your research data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>What We Offer</CardTitle>
                <CardDescription>
                  Our comprehensive data analysis services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Statistical analysis and hypothesis testing",
                    "Data visualization and reporting",
                    "Predictive modeling and forecasting",
                    "Machine learning and AI-driven analysis",
                    "Qualitative data coding and analysis",
                    "Survey data analysis and interpretation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Our streamlined process</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </span>
                    <div>
                      <h3 className="font-medium">Submit Your Data</h3>
                      <p className="text-gray-600">
                        Upload your dataset and provide details about your
                        research objectives.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <h3 className="font-medium">Consultation</h3>
                      <p className="text-gray-600">
                        Our experts will review your data and discuss analysis
                        approaches with you.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <h3 className="font-medium">Analysis & Reporting</h3>
                      <p className="text-gray-600">
                        We perform the analysis and prepare comprehensive
                        reports with visualizations.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      4
                    </span>
                    <div>
                      <h3 className="font-medium">Review & Refinement</h3>
                      <p className="text-gray-600">
                        We present findings and make adjustments based on your
                        feedback.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="bg-slate-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Request Data Analysis Services
            </h2>
            <p className="mb-6">
              Ready to gain insights from your data? Our team of expert analysts
              is ready to help you extract meaningful information from your
              research data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium mb-2"
                >
                  Upload your data files for analysis
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="file-upload"
                    type="file"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary/90"
                    multiple
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => alert("Files uploaded successfully!")}
                  >
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: CSV, XLSX, JSON, TXT (Max 50MB)
                </p>
              </div>
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
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Data Analysis Process
              </CardTitle>
              <CardDescription>
                How we transform your research data into actionable insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Data Assessment</h3>
                  <p className="text-sm text-gray-600">
                    We evaluate your research data to determine the most
                    appropriate analytical approaches.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Analysis Execution</h3>
                  <p className="text-sm text-gray-600">
                    Our experts apply statistical methods and analytical tools
                    to extract patterns and insights.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Insight Delivery</h3>
                  <p className="text-sm text-gray-600">
                    We present findings in clear, actionable reports with
                    visualizations and recommendations.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => navigate("/data-research")}
                >
                  Learn about our research services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "What types of data can you analyze?",
                  answer:
                    "We can analyze various types of data including quantitative (numerical), qualitative (text, interviews), survey responses, experimental data, time series, and more.",
                },
                {
                  question: "How long does the analysis process take?",
                  answer:
                    "The timeline varies depending on the complexity and volume of data. Simple analyses may take 1-2 weeks, while more complex projects might require 4-6 weeks. We'll provide a specific timeline during our initial consultation.",
                },
                {
                  question: "Do you provide raw data along with the analysis?",
                  answer:
                    "Yes, we provide both the processed data and our analysis. You'll receive the complete dataset, analysis code (if applicable), and comprehensive reports with visualizations.",
                },
                {
                  question: "Can you help with interpreting the results?",
                  answer:
                    "Absolutely! Our service includes a consultation to explain the findings, their implications, and how they relate to your research questions or business objectives.",
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

export default DataAnalysis;
