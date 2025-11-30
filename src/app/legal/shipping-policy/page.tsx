export default function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-[#121212] text-gray-300 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-8">Shipping & Delivery Policy</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-gray-500 text-xs">Last Updated: December 01, 2025</p>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Digital Goods Only</h2>
            <p>PerfectResumeScan deals exclusively in digital products (Portfolio Websites and Resume Analysis). <strong>We do not sell or ship any physical goods.</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Delivery Timeline</h2>
            <p>Upon successful payment and file upload:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Instant Access:</strong> Your portfolio website is generated instantly (typically under 60 seconds).</li>
              <li><strong>Email Confirmation:</strong> You will receive an email containing your receipt and the link to your portfolio immediately after the process is complete.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Non-Delivery Issues</h2>
            <p>If you have completed payment but did not receive your portfolio link or email confirmation, please check your spam folder or contact us immediately at <a href="mailto:sid.cse19@gmail.com" className="text-purple-400 hover:underline">sid.cse19@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
