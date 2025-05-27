'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for featured bios
const featuredBios = [
  {
    name: "Sarah Chen",
    slug: "sarah-chen",
    image: "/placeholder-1.jpg",
    quote: "Pioneering AI Ethics in Healthcare",
    fact: "Led the development of the first AI-powered diagnostic tool for rare diseases"
  },
  {
    name: "Marcus Rodriguez",
    slug: "marcus-rodriguez",
    image: "/placeholder-1.jpg",
    quote: "Revolutionizing Renewable Energy",
    fact: "Founded 3 successful clean energy startups before turning 30"
  },
  {
    name: "Aisha Patel",
    slug: "aisha-patel",
    image: "/i2.jpg",
    quote: "Digital Art Visionary",
    fact: "Created the world's first AI-human collaborative art gallery"
  },
  {
    name: "James Wilson",
    slug: "james-wilson",
    image: "/placeholder-1.jpg",
    quote: "Blockchain Innovator",
    fact: "Developed a blockchain solution that reduced transaction costs by 90%"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function FeaturedBios() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          🌟 Featured Bios
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredBios.map((bio) => (
            <motion.div
              key={bio.slug}
              variants={itemVariants}
              className="relative group"
            >
              <div className="rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative w-full aspect-square bg-gray-200">
                  <Image
                    src={bio.image}
                    priority
                    alt={`${bio.name}'s profile`}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{bio.name}</h3>
                    <p className="text-sm text-gray-200 mt-1">{bio.quote}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <Link 
                    href={`/bios/${bio.slug}`}
                    className="inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    Explore Bio
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link
            href="/explore"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Explore More Bios
          </Link>
        </div>
      </div>
    </section>
  );
} 