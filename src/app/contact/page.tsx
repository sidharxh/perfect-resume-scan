import { Mail, MapPin, Phone, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#121212] text-white py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-gray-400 text-center mb-12">
          Have questions or need support? We're here to help.
        </p>
        
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Email Us</h3>
                <p className="text-gray-400 text-sm mb-2">For general queries and support</p>
                <a href="mailto:sid.cse19@gmail.com" className="text-white hover:text-purple-400 transition-colors font-mono">
                  sid.cse19@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Phone</h3>
                <p className="text-gray-400 text-sm mb-2">Mon-Fri from 9am to 6pm IST</p>
                <a href="tel:+919810848810" className="text-white hover:text-purple-400 transition-colors font-mono">
                  +91 9810848810
                </a>
              </div>
            </div>

            {/* Socials */}
             <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <Linkedin size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-3">Social Media</h3>
                <div className="flex gap-4">
                   <a href="https://www.linkedin.com/in/sidharth-singh-867189160/" target="_blank" className="text-gray-400 hover:text-white text-sm font-mono underline">
                     LinkedIn Profile
                   </a>
                   <span className="text-gray-600">|</span>
                   <a href="https://twitter.com/sidharxhh" target="_blank" className="text-gray-400 hover:text-white text-sm font-mono underline">
                     Twitter (@sidharxhh)
                   </a>
                </div>
              </div>
            </div>

            {/* Address (Use your registered business address here for Razorpay compliance) */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Office Address</h3>
                <address className="text-gray-400 text-sm not-italic leading-relaxed font-mono">
                  PerfectResumeScan HQ<br />
                  Lucknow, Uttar Pradesh<br />
                  India
                </address>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
