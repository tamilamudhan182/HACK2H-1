"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Compass, CheckSquare, Clock, HelpCircle } from "lucide-react";

const links = [
  { name: "Timeline", href: "/timeline", icon: Clock },
  { name: "Checklist", href: "/checklist", icon: CheckSquare },
  { name: "FAQs", href: "/faq", icon: HelpCircle },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Compass className="w-8 h-8 text-cyan group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-xl font-bold font-['var(--font-display)'] text-white tracking-wide">
              Election Compass
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-cyan" : "text-mist/70 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
