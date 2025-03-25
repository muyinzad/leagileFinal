import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  description?: string;
  browseReportsLabel?: string;
  subscriptionPlansLabel?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  description = "Unlock the power of data-driven insights with our curated research collection. From market trends to industry forecasts, our expert analyses help you make strategic decisions with confidence.",
  browseReportsLabel = "Browse Reports",
  subscriptionPlansLabel = "View Subscription Plans",
  backgroundImage = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
}: HeroSectionProps) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [
    "Access Expert Research & Insights",
    "Obtain accurate data requirement",
    "We provide data analysis services",
  ];

  const descriptions = [
    "Unlock the power of data-driven insights with our curated research collection. From market trends to industry forecasts, our expert analyses help you make strategic decisions with confidence.",
    "Get precisely the data you need with our customizable research solutions. Our experts ensure you receive accurate, relevant information tailored to your specific requirements.",
    "Transform raw data into actionable intelligence with our comprehensive analysis services. Our team of specialists delivers clear, concise interpretations to drive your business forward.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-slate-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 transform scale-105"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <div className="overflow-hidden min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[4.5rem] mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={titleIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
              >
                {titles[titleIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="overflow-hidden min-h-[4rem] md:min-h-[5rem] mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                className="text-lg md:text-xl"
              >
                {descriptions[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => (window.location.href = "/categories")}
            >
              {browseReportsLabel}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
