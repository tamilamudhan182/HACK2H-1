"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Info, CheckCircle2 } from "lucide-react";

export function HomeClient() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
          </span>
          Your Personal Election Companion
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-['var(--font-display)'] text-transparent bg-clip-text bg-gradient-to-r from-mist via-white to-mist/70 tracking-tight">
          Navigate the Election Process with Confidence
        </h1>
        
        <p className="text-xl md:text-2xl text-mist/70 max-w-2xl mx-auto font-light leading-relaxed">
          Understand every milestone, track your personalized checklist, and get instant answers to your questions.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="/timeline"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan text-ink font-semibold hover:bg-cyan/90 transition-all shadow-[0_0_20px_rgba(89,213,224,0.3)] hover:shadow-[0_0_30px_rgba(89,213,224,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
        >
          Explore Timeline
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link
          href="/checklist"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5 text-gold" />
          My Checklist
        </Link>

        <Link
          href="/faq"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-white/10 text-mist/70 font-medium hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2"
        >
          <Info className="w-5 h-5" />
          FAQs
        </Link>
      </motion.div>

      {/* Animated Feature Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
      >
        {[
          { title: "Visual Timeline", desc: "See the entire election process from start to finish.", icon: "🗓️" },
          { title: "AI Assistant", desc: "Get dynamic answers to your election queries.", icon: "🤖" },
          { title: "Personalized Tasks", desc: "Sync your election duties with Google Tasks.", icon: "✅" }
        ].map((feature, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-mist mb-2">{feature.title}</h3>
            <p className="text-sm text-mist/60 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
