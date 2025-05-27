import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PricingSection from '@/components/sections/PricingSection';
import RequestSection from '@/components/sections/RequestSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
      <RequestSection />
      <FeaturesSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
