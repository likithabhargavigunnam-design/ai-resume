import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import { ArrowRight, Sparkles, FileText, Zap } from 'lucide-react';
import AnimatedHero from '@/components/AnimatedHero';

export const metadata = {
  title: 'inten.pro | AI Resume Maker',
  description: 'Generate ATS-friendly, professional resumes using AI instantly.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-500/30">
      <Navbar />
      <AnimatedHero />
    </div>
  );
}
