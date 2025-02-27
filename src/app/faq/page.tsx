//app/faq/page.tsx

'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping within the UK takes 2-4 business days. International shipping times vary by location, typically 5-10 business days."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with tracking information."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of purchase for unused items in original packaging."
      },
      {
        q: "How do I initiate a return?",
        a: "Log into your account and visit the orders section, or contact our customer service team."
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive your return."
      }
    ]
  },
  {
    category: "Products & ingredients",
    questions: [
      {
        q: "Are your products authentic?",
        a: "Yes, all our products are sourced directly from official Korean manufacturers and distributors."
      },
      {
        q: "Do you test on animals?",
        a: "No, we are committed to cruelty-free beauty. We only work with brands that share this value."
      },
      {
        q: "How do I check product expiration dates?",
        a: "Expiration dates are printed on all product packaging. We also list manufacturing dates in product descriptions."
      }
    ]
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>("Orders & Shipping");
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* FAQ Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-light mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600">
              Find answers to common questions about our products, shipping, and more.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-3xl mx-auto">
            {faqs.map((category) => (
              <div key={category.category} className="mb-8">
                <button
                  onClick={() => setOpenCategory(
                    openCategory === category.category ? null : category.category
                  )}
                  className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-xl font-medium">{category.category}</h2>
                  {openCategory === category.category ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {openCategory === category.category && (
                  <div className="mt-4 space-y-4">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-4">
                        <button
                          onClick={() => toggleQuestion(faq.q)}
                          className="w-full flex items-center justify-between py-2 text-left hover:text-gray-600"
                        >
                          <span className="font-medium">{faq.q}</span>
                          {openQuestions.includes(faq.q) ? (
                            <ChevronUp className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 flex-shrink-0" />
                          )}
                        </button>
                        {openQuestions.includes(faq.q) && (
                          <p className="mt-2 text-gray-600 pl-4">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="max-w-xl mx-auto mt-16 text-center">
            <h3 className="text-xl font-medium mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}