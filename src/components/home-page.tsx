"use client"
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PricingSection from '@/components/sections/PricingSection';
import RequestSection from '@/components/sections/RequestSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import Footer from '@/components/Footer';
import FeaturedBios from '../../components/sections/FeaturedBios';
import { useRef } from 'react';

export default function Home() {
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    pricingSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <main className="min-h-screen bg-black">
      <HeroSection scrollToPricing={scrollToSection} />
      <FeaturedBios/>
      <HowItWorksSection />
      <PricingSection scrollRef={pricingSectionRef} />
      <RequestSection />
      <FeaturesSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
