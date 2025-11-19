interface HowItWorksProps {
  title: string;
  steps: { id: number; title: string; description: string }[];
}

export function HowItWorks({ title, steps }: HowItWorksProps) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">{title}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.id} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">{step.id}</div>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
