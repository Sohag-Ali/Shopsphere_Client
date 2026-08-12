import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../../../coponents/Motion/ScrollReveal";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse products, click View Details, select options, and complete the checkout process seamlessly."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order status live from your User Dashboard under the 'My Orders' tab."
    },
    {
      question: "Can I return a product?",
      answer: "Yes, products can be returned within 7 days if they meet our hassle-free return policy terms."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, Stripe payments, digital wallets, mobile banking, and Cash on Delivery."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery usually takes 2–5 business days depending on your delivery address."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely! All payment transactions are encrypted using industry-standard SSL security."
    }
  ];

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-base-content/70">
          Find quick answers to common questions about shopping, shipping, and payments.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <motion.div
              key={index}
              initial={false}
              className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setActiveIndex(isOpen ? null : index)}
                type="button"
                className="w-full p-5 text-left flex justify-between items-center font-semibold text-lg hover:text-primary transition-colors focus:outline-none"
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary text-xl ml-2 shrink-0"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 pb-5 pt-1 text-base-content/80 border-t border-base-200">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </ScrollReveal>
    </section>
  );
};

export default FAQ;