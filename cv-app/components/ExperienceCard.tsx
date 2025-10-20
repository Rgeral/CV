'use client';

import { Experience } from '@/types/cv';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white"
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{experience.title}</h3>
          <p className="text-lg text-gray-700">{experience.company}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500"
        >
          ▼
        </motion.div>
      </div>

      <div className="flex gap-4 text-sm text-gray-600 mb-3">
        <span>📍 {experience.location}</span>
        <span>📅 {experience.period}</span>
      </div>

      <p className="text-gray-700 mb-3">{experience.description}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Réalisations :</h4>
              <ul className="space-y-2 mb-4">
                {experience.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">{detail}</span>
                  </motion.li>
                ))}
              </ul>

              <h4 className="font-semibold text-gray-900 mb-3">Technologies :</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-3 print:hidden">
        {isExpanded ? 'Cliquer pour réduire' : 'Cliquer pour plus de détails'}
      </p>
    </motion.div>
  );
}
