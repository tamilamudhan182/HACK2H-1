"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, HelpCircle, BookOpen } from "lucide-react";
import type { FaqItem, ResourceLink } from "@/lib/types";

interface FAQClientProps {
  faqs: FaqItem[];
  resources: ResourceLink[];
}

export function FAQClient({ faqs, resources }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* FAQs Section */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan" />
          Frequently Asked Questions
        </h2>
        
        {faqs.map((faq, idx) => (
          <motion.div 
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-white/5 transition-colors"
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <span className="font-medium text-white">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-cyan transition-transform duration-300 shrink-0 ml-2 ${openIndex === idx ? "rotate-180" : ""}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  id={`faq-answer-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-white/5">
                    <p className="text-mist/80 text-sm leading-relaxed mb-2 font-medium">{faq.shortAnswer}</p>
                    <p className="text-mist/60 text-sm leading-relaxed">{faq.detailedAnswer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Resources Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan" />
          Official Links
        </h2>
        
        {resources.map((resource, idx) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-2xl bg-cyan/5 border border-cyan/10 hover:bg-cyan/10 hover:border-cyan/30 transition-all"
            aria-label={`Visit ${resource.title} — ${resource.category}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white group-hover:text-cyan transition-colors mb-1">
                  {resource.title}
                </h3>
                <p className="text-xs text-mist/50 mb-1">{resource.description}</p>
                <span className="text-xs text-cyan/60 uppercase tracking-wider">
                  {resource.category}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-cyan/50 group-hover:text-cyan group-hover:-translate-y-1 group-hover:translate-x-1 transition-all shrink-0 ml-2 mt-1" />
            </div>
          </a>
        ))}

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-center">
          <p className="text-sm text-mist/80 mb-4">
            Still have questions? Our AI Assistant is here to help!
          </p>
          <button 
            onClick={() => {
              // Trigger the floating assistant by dispatching a custom event
              window.dispatchEvent(new CustomEvent("open-assistant"));
            }}
            className="px-4 py-2 bg-cyan text-ink text-sm font-semibold rounded-lg w-full shadow-[0_0_15px_rgba(89,213,224,0.3)] hover:shadow-[0_0_25px_rgba(89,213,224,0.5)] transition-shadow"
          >
            Open Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
