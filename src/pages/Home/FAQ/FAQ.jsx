const FAQ = () => {

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, click View Details, and complete the checkout process."
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from your dashboard after placing an order."
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, products can be returned within 7 days if they meet our return policy."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, mobile banking, and cash on delivery."
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 2–5 business days depending on your location."
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, all transactions are encrypted and processed through secure payment gateways."
    }
  ];

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <p className="text-base-content/70">
          Find answers to common questions about shopping and orders.
        </p>

      </div>

      <div className="space-y-4">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="
              collapse
              collapse-arrow
              bg-base-100
              border
              border-base-300
              rounded-xl
            "
          >
            <input type="radio" name="faq-accordion" />

            <div className="collapse-title text-lg font-semibold">
              {faq.question}
            </div>

            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FAQ;