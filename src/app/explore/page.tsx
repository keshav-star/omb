'use client';

import { motion } from 'framer-motion';
import { ExploreHero } from '@/components/sections/ExploreHero';
import { CategoryGrid } from '@/components/categories/CategoryGrid';
import { TrendingBios } from '@/components/bios/TrendingBios';
import { BioFilter } from '@/components/filters/BioFilter';
import { CallToAction } from '@/components/shared/CallToAction';
import { BackgroundBeams } from '@/components/ui/background-beams';

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-black relative">
      <BackgroundBeams />
      <div className="relative z-10">
        <ExploreHero />
        
        <section className="container mx-auto px-4 py-12">
          <BioFilter />
          <CategoryGrid />
        </section>

        <section className="container mx-auto px-4 py-12">
          <TrendingBios />
        </section>

        <section className="container mx-auto px-4 py-12">
          <CallToAction 
            title="Join Our Community"
            description="Be part of a growing community of learners and explorers"
            buttonText="Get Started"
            buttonLink="/signup"
          />
        </section>
      </div>
    </main>
  );
} 