import landingContent from "@/data/landing.json";
import { HeroSection } from "@/components/Landing/HeroSection";
import { HowItWorks } from "@/components/Landing/HowItWorks";
import { Checklist } from "@/components/Landing/Checklist";
import { FAQSection } from "@/components/Landing/FAQSection";

export default function LandingPage() {
  // Map snake_case JSON fields to component props
  const hero = {
    title: landingContent.hero.headline,
    description: landingContent.hero.subheadline,
    ctaText: landingContent.hero.cta,
  };

  const howItWorks = {
    title: landingContent.how_it_works.headline,
    steps: landingContent.how_it_works.steps.map((s: any, idx: number) => ({
      id: idx + 1,
      title: s.step,
      description: s.description,
    })),
  };

  const checklist = {
    title: landingContent.checklist.headline,
    items: landingContent.checklist.items.map((text: string, idx: number) => ({
      id: idx + 1,
      text,
      passed: false,
    })),
  };

  const faqSection = {
    title: landingContent.faq.headline,
    faqs: landingContent.faq.questions.map((q: any, idx: number) => ({
      id: idx + 1,
      question: q.q,
      answer: q.a,
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection {...hero} />
      <div className="px-4 md:px-0">
        <HowItWorks title={howItWorks.title} steps={howItWorks.steps} />
        <Checklist title={checklist.title} items={checklist.items} />
        <FAQSection title={faqSection.title} faqs={faqSection.faqs} />
      </div>
    </div>
  );
}
