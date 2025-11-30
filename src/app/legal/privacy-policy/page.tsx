export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#121212] text-gray-300 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-gray-500 text-xs">Last Updated: December 01, 2025</p>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>Welcome to PerfectResumeScan. This policy outlines how we handle your data. By using our service, you understand that the primary purpose of this tool is to create a <strong>public portfolio website</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>We collect minimal data necessary to render your website:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Personal Information:</strong> We only collect your Name and Email address for account management and communication.</li>
              <li><strong>Resume Data:</strong> The content extracted from your uploaded resume (experience, skills, projects). By nature of this service, this data is processed to be displayed publicly on your generated portfolio URL.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Public Nature of Data</h2>
            <p>Please be aware that <strong>resume data uploaded to this platform is intended for public display</strong>. The service generates a publicly accessible URL (e.g., perfectresumescan.com/portfolio/your-name) which can be viewed by anyone with the link, including recruiters and search engines.</p>
          </section>

           <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Usage</h2>
            <p>We use your email address solely to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
               <li>Send you the link to your generated portfolio.</li>
               <li>Communicate service updates or critical account information.</li>
            </ul>
            <p className="mt-2">We do <strong>not</strong> share, sell, or distribute your email address to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
            <p>For privacy concerns, contact us at: <a href="mailto:sid.cse19@gmail.com" className="text-purple-400 hover:underline">sid.cse19@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
