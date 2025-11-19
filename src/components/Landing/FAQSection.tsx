interface FAQSectionProps {
  title: string;
  faqs: { id: number; question: string; answer: string }[];
}

export function FAQSection({ title, faqs }: FAQSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{title}</h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.id} className="group bg-white border border-gray-100 rounded-lg p-4">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="mt-3 text-sm text-gray-700">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
