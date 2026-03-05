'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Plus, FileText, Trash2, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Resume = {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
};

export default function Dashboard() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await fetch('/api/resumes');
            if (res.ok) {
                const data = await res.json();
                setResumes(data);
            }
        } catch (error) {
            console.error('Error fetching resumes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteResume = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resume?')) return;
        try {
            const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setResumes(resumes.filter((r) => r.id !== id));
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
                        <p className="text-zinc-400">Manage your AI-generated resumes here.</p>
                    </div>
                    <Link href="/builder">
                        <Button className="group">
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                            Create New Resume
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-zinc-700/50 bg-transparent shadow-none">
                        <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-8 h-8 text-zinc-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No resumes yet</h3>
                        <p className="text-zinc-400 max-w-sm mx-auto mb-8">
                            You haven't generated any resumes. Create your first one to get started!
                        </p>
                        <Link href="/builder">
                            <Button>Create your first resume</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <Card key={resume.id} className="group hover:-translate-y-1 transition-transform cursor-pointer flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                                        <FileText className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <CardTitle>{resume.title}</CardTitle>
                                    <CardDescription>
                                        Last updated {formatDistanceToNow(new Date(resume.updated_at))} ago
                                    </CardDescription>
                                </div>

                                <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/5 disabled:opacity-50">
                                    <Link href={`/resumes/${resume.id}`} className="text-sm font-medium text-blue-400 hover:text-blue-300">
                                        View Format &rarr;
                                    </Link>
                                    <button
                                        onClick={() => deleteResume(resume.id)}
                                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
