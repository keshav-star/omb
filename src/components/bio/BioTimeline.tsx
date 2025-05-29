'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TimelineEvent {
  year: number;
  event: string;
  description: string;
}

interface BioTimelineProps {
  events: TimelineEvent[];
}

export default function BioTimeline({ events }: BioTimelineProps) {
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);

  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20" />

      {/* Events */}
      <div className="space-y-12">
        {sortedEvents.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Year Marker */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                  activeEvent?.year === event.year
                    ? 'bg-white text-black'
                    : 'bg-white/20 text-white'
                }`}
                onClick={() => setActiveEvent(event)}
              >
                {event.year}
              </motion.div>
            </div>

            {/* Content */}
            <div
              className={`grid grid-cols-2 gap-8 ${
                index % 2 === 0 ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`${
                  index % 2 === 0 ? 'order-1' : 'order-2'
                } ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <h3 className="text-xl font-semibold">{event.event}</h3>
                  <p className="text-gray-300">{event.description}</p>
                </motion.div>
              </div>
              <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Event Detail Modal */}
      {activeEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-lg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-2">{activeEvent.event}</h2>
            <p className="text-2xl text-white/60 mb-4">{activeEvent.year}</p>
            <p className="text-lg text-gray-300">{activeEvent.description}</p>
            <button
              onClick={() => setActiveEvent(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 