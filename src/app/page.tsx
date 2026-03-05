import AnimatedHero from '@/components/AnimatedHero';
import Navbar from '@/components/Navbar';

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
