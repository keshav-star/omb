'use client';

import { motion } from 'framer-motion';
import BioHero from '@/components/bio/BioHero';
import BioStoryPanel from '@/components/bio/BioStoryPanel';
import BioMedia from '@/components/bio/BioMedia';
import BioTimeline from '@/components/bio/BioTimeline';
import BioQuoteCarousel from '@/components/bio/BioQuoteCarousel';
import CallToAction from '@/components/shared/CallToAction';

// Mock data - In a real app, this would come from an API or database
const mockBioData = {
  id: '1',
  name: 'Jane Doe',
  tagline: 'Pioneering the Future of Technology',
  coverImage: '/images/bio-cover.jpg',
  summary: 'A visionary leader in technology and innovation...',
  story: {
    earlyLife: {
      title: 'The Early Spark',
      content: 'Born in a small town...',
      image: '/images/early-life.jpg',
      quote: 'The future belongs to those who believe in the beauty of their dreams.'
    },
    journey: {
      title: 'The Journey',
      content: 'Overcoming challenges...',
      image: '/images/journey.jpg',
      quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.'
    },
    impact: {
      title: 'The Impact',
      content: 'Transforming industries...',
      image: '/images/impact.jpg',
      quote: 'The best way to predict the future is to create it.'
    }
  },
  media: {
    videos: [
      { id: 1, title: 'Keynote Speech', url: '/videos/keynote.mp4', thumbnail: '/images/keynote-thumb.jpg' },
      { id: 2, title: 'Interview', url: '/videos/interview.mp4', thumbnail: '/images/interview-thumb.jpg' }
    ],
    audio: [
      { id: 1, title: 'Podcast Episode', url: '/audio/podcast.mp3', duration: '45:30' },
      { id: 2, title: 'Radio Interview', url: '/audio/radio.mp3', duration: '30:15' }
    ]
  },
  timeline: [
    { year: 2010, event: 'Started first company', description: 'Launched innovative tech startup' },
    { year: 2015, event: 'Major breakthrough', description: 'Developed revolutionary technology' },
    { year: 2020, event: 'Global recognition', description: 'Received prestigious award' }
  ],
  quotes: [
    'Innovation distinguishes between a leader and a follower.',
    'The only way to do great work is to love what you do.',
    'Stay hungry, stay foolish.'
  ]
};

export default function BioPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <BioHero
        name={mockBioData.name}
        tagline={mockBioData.tagline}
        coverImage={mockBioData.coverImage}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BioStoryPanel story={mockBioData.story} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="my-24"
        >
          <BioMedia media={mockBioData.media} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="my-24"
        >
          <BioTimeline events={mockBioData.timeline} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="my-24"
        >
          <BioQuoteCarousel quotes={mockBioData.quotes} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="my-24"
        >
          <CallToAction
            title="Be Inspired"
            description="Start your own journey of innovation and impact"
            primaryButton={{ text: 'Share This Story', onClick: () => {} }}
            secondaryButton={{ text: 'Request a Bio', onClick: () => {} }}
          />
        </motion.div>
      </div>
    </main>
  );
} 