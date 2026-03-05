import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ResumePreview from '@/components/ResumePreview';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Download, Edit, ArrowLeft } from 'lucide-react';

export default async function SavedResumeView(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Please log in to view this resume.</p>
            </div>
        );
    }

    const { data: resume, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single();

    if (error || !resume) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8">
                <div className="flex justify-between items-center mb-8 print:hidden">
                    <Link href="/dashboard" className="text-zinc-400 hover:text-white flex items-center text-sm font-medium transition">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>

                    <div className="flex gap-2">
                        <Link href="/builder">
                            <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Create New
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-black/50 p-4 sm:p-8 rounded-3xl border border-white/5 shadow-2xl overflow-x-auto flex justify-center print:bg-transparent print:border-none print:shadow-none print:p-0">
                    <div className="scale-[0.85] sm:scale-100 origin-top">
                        <div className="print:block print:w-full print:absolute print:inset-0 print:m-0 print:p-0">
                            <ResumePreview data={resume.content} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Print only styles to ensure UI doesn't print */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @media print {
          body { visibility: hidden; background: white; }
          .print\\:hidden { display: none !important; }
          #resume-preview { visibility: visible; position: absolute; left: 0; top: 0; margin: 0; padding: 0; box-shadow: none; max-width: 100%; width: 100%; }
        }
      `}} />
        </div>
    );
}
