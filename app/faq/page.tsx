'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_FAQS } from '@/lib/data';
import { useUIStore } from '@/lib/store/useUIStore';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function FAQPage() {
  const { setCursorType } = useUIStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-4xl px-4 md:px-8">
        
        {/* ================= PAGE HEADER ================= */}
        <div className="py-12 border-b border-border/60 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            NEURAL INDEX INQUIRIES
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
            Syndicate FAQS
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto font-light leading-relaxed">
            Clarify protocols regarding smart fabric materials, drone air telemetry delivery schedules, and secure cryptographic transactions.
          </p>
        </div>

        {/* ================= ACCORDIONS LIST ================= */}
        <div className="mt-12 space-y-4">
          {MOCK_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-secondary/15 border border-border glass rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-display font-bold text-sm sm:text-base text-foreground"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-accent stroke-[2px]" />
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-accent" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 font-light animate-in fade-in slide-in-from-top-1 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
