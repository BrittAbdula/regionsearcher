'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const images = [
  { src: '/us-search.png', alt: 'Nike search in US', country: 'United States' },
  { src: '/japan-search.png', alt: 'Nike search in Japan', country: 'Japan' },
  { src: '/taiwan-search.png', alt: 'Nike search in Taiwan', country: 'Taiwan' },
  { src: '/korea-search.png', alt: 'Nike search in Korea', country: 'Korea' },
];

const NikeSearchResults: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nike Search Results Across Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <ImageCard key={index} {...image} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ImageCard: React.FC<{ src: string; alt: string; country: string }> = ({ src, alt, country }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48">
        <Image
          src={src}
          alt={alt}
          fill
          className=" object-cover" 
        />
      </div>
      <p className="p-4 text-center font-semibold text-gray-800">{country}</p>
    </motion.div>
  );
};

export default NikeSearchResults;