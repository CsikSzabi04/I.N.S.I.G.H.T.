import React from 'react';
import { motion } from 'framer-motion';

export default function TechLab() {
  return (
    <section
      className="h-[600px] bg-cover bg-center relative p-8"
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 bg-[url('https://images.stockcake.com/public/d/2/1/d2100fa9-77af-42ff-91ba-4a67ff69de27_large/magnifying-fingerprints-investigation-stockcake.jpg')] bg-cover bg-center opacity-30" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 max-w-3xl mx-auto text-center pt-24"
      >
        <h1 className="text-4xl text-teal-300 font-bold mb-4">Tech Lab in Action</h1>
        <p className="text-gray-300 mb-4">
          Where our profilers and IT experts co-develop advanced tools for behavioral pattern recognition,
          data mining, and secure network infiltration.
        </p>
        <p className="text-gray-400">
          We bridge the gap between human insight and machine intelligence.
        </p>
      </motion.div>
    </section>
  );
}
