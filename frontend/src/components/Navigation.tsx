"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, CheckSquare, Clock, HelpCircle } from "lucide-react";

const links = [
  { name: "Timeline", href: "/timeline", icon: Clock },
  { name: "Checklist", href: "/checklist", icon: CheckSquare },
  { name: "FAQs", href: "/faq", icon: HelpCircle },
];

export function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 1]);
  const headerScale = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 50], ["0px", "12px"]);

  return (
    <motion.header 
      style={{ 
        backgroundColor: `rgba(3, 8, 22, ${headerOpacity.get()})`,
        backdropFilter: `blur(${headerBlur.get()})`
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl border border-white/10 premium-glass transition-all"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center group-hover:rotate-12 transition-all group-hover:cyan-glow">
              <Compass className="w-6 h-6 text-cyan" />
            </div>
            <span className="text-xl font-bold font-['Outfit'] text-white tracking-tight">
              Election <span className="text-cyan">Compass</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 relative px-4 py-2 text-sm font-semibold transition-all rounded-xl ${
                    isActive ? "text-cyan bg-cyan/5" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-cyan/10 rounded-xl -z-10 border border-cyan/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-assistant"))}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-cyan/10 hover:text-cyan hover:border-cyan/30 transition-all cursor-pointer"
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
