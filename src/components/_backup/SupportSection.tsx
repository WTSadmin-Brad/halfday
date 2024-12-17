/**
 * SupportSection Component
 *
 * Purpose:
 * Provides user assistance resources, app information, and support options
 * with an emphasis on accessibility and user education.
 *
 * Key Features:
 * - Collapsible FAQ sections
 * - Interactive tutorial access
 * - Version information display
 * - Direct support channels
 *
 * Learning Notes:
 * - Uses compound components for accordion
 * - Implements progressive disclosure
 * - Demonstrates state management patterns
 * - Shows advanced animation techniques
 */

import React, { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  Info,
  ExternalLink,
} from "lucide-react";
import ProfileContainer from "./ProfileContainer";

// Type definitions for component structure
interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

interface TutorialSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

// Reusable accordion component with animation
const AccordionItem: React.FC<
  FAQItem & { isOpen: boolean; toggle: () => void }
> = ({ question, answer, isOpen, toggle }) => (
  <div className="border-b border-white border-opacity-10">
    <button
      onClick={toggle}
      className="w-full py-4 flex items-center justify-between text-left"
    >
      <span className="text-white font-medium">{question}</span>
      <ChevronDown
        className={`
        h-5 w-5 text-gray-400 transition-transform duration-300
        ${isOpen ? "transform rotate-180" : ""}
      `}
      />
    </button>
    <div
      className={`
      overflow-hidden transition-all duration-300
      ${isOpen ? "max-h-48" : "max-h-0"}
    `}
    >
      <p className="pb-4 text-gray-400 text-sm">{answer}</p>
    </div>
  </div>
);

const SupportSection = () => {
  // State management for FAQ accordion
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  // FAQ data with common questions
  const faqs: FAQItem[] = [
    {
      id: "offline",
      question: "How does offline mode work?",
      answer:
        "The app continues to function without internet connection. Your changes are saved locally and automatically sync when connection is restored.",
    },
    {
      id: "status",
      question: "How do I change my work status?",
      answer:
        "Select any day from the calendar and use the status buttons (Full Day, Half Day, Off) to update your status. Changes are saved automatically.",
    },
    {
      id: "sync",
      question: "Why are my changes not syncing?",
      answer:
        "Changes may take a few minutes to sync. Check your internet connection and the sync status in the Data Management section.",
    },
  ];

  // Tutorial sections configuration
  const tutorials: TutorialSection[] = [
    {
      title: "Quick Start Guide",
      description: "Learn the basics in 5 minutes",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      action: () => console.log("Open quick start guide"),
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: <ExternalLink className="h-5 w-5 text-green-500" />,
      action: () => console.log("Open video tutorials"),
    },
  ];

  return (
    <ProfileContainer className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Support</h2>

      {/* Version Information Card */}
      <div className="bg-white bg-opacity-5 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 text-gray-400 mb-2">
          <Info className="h-4 w-4" />
          <span className="text-sm">App Information</span>
        </div>
        <div className="space-y-1">
          <p className="text-white">Version 1.2.3</p>
          <p className="text-sm text-gray-400">Last Updated: Dec 13, 2024</p>
        </div>
      </div>

      {/* Tutorial Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {tutorials.map((tutorial) => (
          <button
            key={tutorial.title}
            onClick={tutorial.action}
            className="
              p-4 rounded-lg
              bg-white bg-opacity-5
              hover:bg-opacity-10
              transition-all duration-300
              text-left
            "
          >
            <div className="flex items-center space-x-3">
              {tutorial.icon}
              <div>
                <h3 className="text-white font-medium">{tutorial.title}</h3>
                <p className="text-sm text-gray-400">{tutorial.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="mb-6">
        <h3 className="text-white font-medium mb-4">
          Frequently Asked Questions
        </h3>
        <div className="rounded-lg bg-white bg-opacity-5 p-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              {...faq}
              isOpen={openFAQ === faq.id}
              toggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>

      {/* Contact Channels */}
      <div>
        <h3 className="text-white font-medium mb-4">Get in Touch</h3>
        <div className="space-y-4">
          {/* Support Chat */}
          <button
            className="
            w-full p-4 rounded-lg
            bg-blue-500 hover:bg-blue-600
            flex items-center justify-center gap-2
            text-white font-medium
            transition-colors duration-300
          "
          >
            <MessageCircle className="h-5 w-5" />
            Start Support Chat
          </button>

          {/* Additional Contact Methods */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href="tel:+1234567890"
              className="
                p-4 rounded-lg
                bg-white bg-opacity-5
                hover:bg-opacity-10
                flex items-center gap-2
                text-white
                transition-all duration-300
              "
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">Call Support</span>
            </a>

            <a
              href="mailto:support@example.com"
              className="
                p-4 rounded-lg
                bg-white bg-opacity-5
                hover:bg-opacity-10
                flex items-center gap-2
                text-white
                transition-all duration-300
              "
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default SupportSection;
