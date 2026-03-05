'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, FileText, Zap } from 'lucide-react';

export default function AnimatedHero() {
    return (
        <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background Gradients */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto w-full pt-20 pb-32 flex flex-col items-center text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                >
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-zinc-300">Powered by LLaMA 3.1 via OpenRouter</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 font-display leading-[1.1]"
                >
                    Craft the perfect resume <br className="hidden md:block" />
                    <span className="text-gradient">in seconds.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10"
                >
                    Stop struggling with formatting and writer&apos;s block. Our AI transforms your raw experience into a professional, ATS-friendly resume instantly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link href="/builder" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto group">
                            Build Your Resume
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="#features" className="w-full sm:w-auto">
                        <Button variant="glass" size="lg" className="w-full sm:w-auto">
                            See Features
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Feature Highlights section */}
            <div id="features" className="max-w-7xl mx-auto w-full py-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 border-t border-white/5 relative z-10">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-8 rounded-3xl"
                >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                        <Zap className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                    <p className="text-zinc-400">Powered by OpenRouter&apos;s free LLaMA 3.1 inference, generating tailored content in seconds.</p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-8 rounded-3xl"
                >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                        <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">AI-Enhanced Phrasing</h3>
                    <p className="text-zinc-400">Turns basic job duties into impact-driven, action-oriented bullet points that impress.</p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-8 rounded-3xl"
                >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                        <FileText className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">ATS Friendly</h3>
                    <p className="text-zinc-400">Clean, structured formats designed to pass Application Tracking Systems effortlessly.</p>
                </motion.div>
            </div>
        </main>
    );
}
