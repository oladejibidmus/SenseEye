import React from 'react';
import { motion } from 'framer-motion';
import { SupabaseTest } from '../components/debug/SupabaseTest';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const SupabaseTestPage: React.FC = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <SupabaseTest />
      </motion.div>
    </motion.div>
  );
};