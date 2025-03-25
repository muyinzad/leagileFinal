import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Leagile Data Research Center
            </h3>
            <p className="text-slate-300 mb-4">
              Your trusted platform for expert research and consultation
              services.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-300 hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-slate-300 hover:text-white"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-slate-300 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-300 hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Github"
                className="text-slate-300 hover:text-white"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Browse Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Subscription Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Expert Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Research Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Business & Finance
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Technology & Innovation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Healthcare & Medicine
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Environmental Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Social Sciences
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-300">
                  123 Research Avenue, Knowledge City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-300">
                  contact@researchmarket.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Copyright */}
        <div className="text-center text-slate-400 text-sm">
          <p>
            © {new Date().getFullYear()} Leagile Data Research Center. All
            rights reserved.
          </p>
          <div className="mt-2">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
