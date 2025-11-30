import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

// --- Import the Shared Template ---
import PortfolioTemplate from '@/components/portfolio-template/template';
import { PortfolioData } from '@/types';

// --- 1. Fetch Logic (RLS Protected) ---
async function getPortfolioData(slug: string): Promise<PortfolioData | null> {
  const supabase = await createClient();

  const { data: record, error } = await supabase
    .from('users_perfectresumescan')
    .select('status, json_url')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !record || !record.json_url) {
    if (error) console.error("Supabase Error:", error);
    return null;
  }

  try {
    const res = await fetch(record.json_url, { 
      cache: 'no-store',
      next: { tags: [`portfolio-${slug}`] } 
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
}

// --- 2. Metadata (SEO) ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioData(slug);

  if (!data || !data.personalInfo) {
    return { 
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found.' 
    };
  }

  const fullName = data.personalInfo.fullName || 'Portfolio';
  const title = data.personalInfo.title || 'Professional';
  const bio = data.personalInfo.bio || '';

  return {
    title: `${fullName} - ${title}`,
    description: bio.slice(0, 160),
    openGraph: {
      title: `${fullName} - ${title}`,
      description: bio.slice(0, 160),
      type: 'website',
    }
  };
}

// --- 3. Main Component ---
export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortfolioData(slug);

  if (!data) {
    notFound(); 
  }

  // --- RENDER UI ---
  // TRICK: Use 'fixed inset-0 z-[999]' to cover the Root Layout's Header & Footer.
  // We act as our own "Window" on top of the website.
  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[#0a0f1e] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <PortfolioTemplate data={data} />
    </div>
  );
}
