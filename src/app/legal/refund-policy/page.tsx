export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-[#121212] text-gray-300 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-8">Cancellation & Refund Policy</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-gray-500 text-xs">Last Updated: December 01, 2025</p>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. General Policy</h2>
            <p>At PerfectResumeScan, we strive to provide high-quality portfolio generation services. Due to the digital nature of our product (instant portfolio generation), we generally do not offer refunds once the service has been delivered/consumed.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Refund Eligibility</h2>
            <p>Refunds may be considered under the following specific circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Technical Failure:</strong> If the system failed to generate your portfolio after a successful payment and our support team cannot resolve the issue within 48 hours.</li>
              <li><strong>Duplicate Payment:</strong> If you were accidentally charged twice for the same transaction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Processing Timelines</h2>
            <p>If your refund request is approved:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>The refund will be initiated within 5-7 working days.</li>
              <li>The amount will be credited back to your original payment method (Source).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. How to Request a Refund</h2>
            <p>To request a refund, please email us at <a href="mailto:sid.cse19@gmail.com" className="text-purple-400 hover:underline">sid.cse19@gmail.com</a> with your Transaction ID and a description of the issue.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
