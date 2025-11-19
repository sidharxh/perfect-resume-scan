interface ChecklistProps {
  title: string;
  items: { id: number; text: string; passed: boolean }[];
}

export function Checklist({ title, items }: ChecklistProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{title}</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-100">
              <div className={`h-10 w-10 flex items-center justify-center rounded-full ${item.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {item.passed ? '✓' : '✕'}
              </div>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
