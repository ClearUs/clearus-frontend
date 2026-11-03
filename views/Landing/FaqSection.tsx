'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'payments',
    question: 'Does ClearUs process payments?',
    answer:
      'No. ClearUs is not a payment gateway. If a clearance step needs proof of payment, you upload your receipt.',
  },
  {
    id: 'find-school',
    question: 'How do I find my school on ClearUs?',
    answer:
      'Search your university in the directory or type your school code (e.g. futo, unilag). Each school has its own custom portal with your clearances already prepared.',
  },
  {
    id: 'reuse-doc',
    question: 'Can I reuse a document for more than one step?',
    answer:
      'Yes. With your Document Vault, you upload a file once and can attach the exact same document to any clearance step that requires it.',
  },
  {
    id: 'returned-doc',
    question: 'What happens if an officer returns my document?',
    answer:
      "You receive an instant notification with the officer's exact feedback. You can correct and resubmit the document in a few clicks directly from your vault.",
  },
  {
    id: 'certificate',
    question: 'When do I get my certificate?',
    answer:
      'The moment your clearance is approved by the final officer, your official signed certificate with QR verification is ready to download and print immediately.',
  },
];

export default function FaqSection() {
  // First item open by default matching Figma [385:2207]
  const [openId, setOpenId] = useState<string | null>('payments');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-[#E2EBE5]/60 overflow-hidden">
      <div className="w-full max-w-312 mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Heading matching Figma [385:2202] (NO EYEBROW - visible: false in Figma) */}
        <div className="max-w-155 mx-auto text-center mb-12 sm:mb-14">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#13241A] font-jakarta leading-[1.18] tracking-[-0.66px]">
            Frequently Asked Questions <br className="hidden sm:inline" /> Students Ask
          </h2>
        </div>

        {/* FAQ List matching Figma [385:2206] (800px max width, gap=12px) */}
        <div className="max-w-200 mx-auto flex flex-col gap-3">
          {FAQS.map(faq => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                onClick={() => toggleItem(faq.id)}
                className={`w-full rounded-2xl bg-white p-6 sm:p-7 transition-colors duration-300 cursor-pointer select-none shadow-2xs ${
                  isOpen
                    ? 'border border-[#16A34A]'
                    : 'border border-[#E2EBE5] hover:border-[#C9D8CE]'
                }`}
              >
                {/* Header Row [385:2208] */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[17px] sm:text-[19px] font-bold text-[#13241A] font-jakarta leading-6.5">
                    {faq.question}
                  </h3>

                  {/* Toggle Button [385:2210 / 385:2216] with smooth icon rotation */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`w-8.5 h-8.5 rounded-full shrink-0 flex items-center justify-center font-bold text-[18px] transition-colors duration-200 leading-none ${
                      isOpen
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-[#F0FDF4] text-[#15803D]'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </motion.div>
                </div>

                {/* Animated Smooth Collapsible Answer Container */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.32, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.22, delay: 0.06 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.24, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.14 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-[15px] sm:text-[16px] text-[#5E7165] leading-6.25 pt-3.5 pr-8"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
