import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PricingSection from '@/components/sections/PricingSection';
import RequestSection from '@/components/sections/RequestSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import Footer from '@/components/Footer';
import FeaturedBios from '../../components/sections/FeaturedBios';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeaturedBios/>
      <HowItWorksSection />
      <PricingSection />
      <RequestSection />
      <FeaturesSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
