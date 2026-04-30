"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Info, CheckCircle2, Sparkles, Map, Calendar, MessageSquare, ShieldCheck } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HomeClient() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-20"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-medium cyan-glow">
            <Sparkles className="w-4 h-4" />
            Empowering Every Vote
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold premium-gradient-text leading-[1.1] md:leading-[1.05]">
            Master Your <br />
            <span className="text-cyan drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Civic Journey</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            The premium election companion designed to guide you through every milestone with precision, security, and clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href="/timeline"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-cyan text-ink font-bold hover:bg-cyan/90 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/checklist"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl premium-glass text-white font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
            >
              <CheckCircle2 className="w-5 h-5 text-cyan" />
              Checklist
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
          {/* Main Feature - Timeline */}
          <Link href="/timeline" className="md:col-span-2 md:row-span-2 group">
            <div className="h-full premium-glass rounded-[2rem] p-10 flex flex-col justify-between hover:border-cyan/30 transition-all relative overflow-hidden group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar className="w-48 h-48 text-cyan" />
              </div>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-cyan/10 flex items-center justify-center mb-6 group-hover:cyan-glow transition-all">
                  <Calendar className="w-8 h-8 text-cyan" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Interactive Timeline</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                  Navigate every phase of the election process with deep-context milestones and reminders.
                </p>
              </div>
              <div className="flex items-center gap-2 text-cyan font-semibold group-hover:gap-4 transition-all">
                Explore milestones <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* AI Assistant */}
          <div className="md:col-span-2 premium-glass rounded-[2rem] p-8 flex items-center gap-6 group hover:border-cyan/30 transition-all hover:-translate-y-2 cursor-pointer" 
               onClick={() => window.dispatchEvent(new CustomEvent("open-assistant"))}>
            <div className="w-20 h-20 shrink-0 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
              <MessageSquare className="w-10 h-10 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Smart Assistant</h3>
              <p className="text-slate-400">Context-aware answers to your election queries 24/7.</p>
            </div>
          </div>

          {/* Maps */}
          <div className="md:col-span-1 premium-glass rounded-[2rem] p-8 flex flex-col justify-center text-center group hover:border-cyan/30 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
              <Map className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Booth Maps</h3>
            <p className="text-sm text-slate-400">Find your polling station instantly.</p>
          </div>

          {/* Security */}
          <div className="md:col-span-1 premium-glass rounded-[2rem] p-8 flex flex-col justify-center text-center group hover:border-cyan/30 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Secure & Private</h3>
            <p className="text-sm text-slate-400">Encrypted and data-safe environment.</p>
          </div>
        </motion.div>

        {/* FAQ Quick Access */}
        <motion.div variants={itemVariants} className="text-center pt-10">
          <Link href="/faq" className="inline-flex items-center gap-3 text-slate-500 hover:text-cyan transition-colors group">
            <Info className="w-5 h-5" />
            Need more information? View our comprehensive FAQs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
