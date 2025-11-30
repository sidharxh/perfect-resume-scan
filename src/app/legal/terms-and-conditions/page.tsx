export default function Terms() {
  return (
    <main className="min-h-screen bg-[#121212] text-gray-300 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-8">Terms and Conditions</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-gray-500 text-xs">Last Updated: December 01, 2025</p>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Service Description</h2>
            <p>PerfectResumeScan is a tool that converts PDF resumes into public portfolio websites. By using this service, you acknowledge that the content you upload will be made publicly accessible on the internet via a unique URL.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. User Data & Privacy</h2>
            <p>You agree that you are voluntarily uploading your professional information for the explicit purpose of public display. We collect only your Name and Email for administrative purposes. We are not responsible for how third parties (e.g., recruiters, scrapers) use the data displayed on your public portfolio page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. User Responsibilities</h2>
            <p>You represent and warrant that:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>You own the resume content or have the right to publish it.</li>
              <li>You will not upload sensitive personal data (e.g., government IDs, financial info) that you do not wish to be public.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Payments</h2>
            <p>Payments are processed securely via Razorpay. Access to premium features or downloads is granted immediately upon successful transaction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Limitation of Liability</h2>
            <p>PerfectResumeScan is provided "as is". We make no guarantees regarding employment opportunities or the continuous availability of the generated website.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
