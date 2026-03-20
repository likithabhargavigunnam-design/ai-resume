'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import ResumePreview, { TEMPLATES, TemplateId, MOCK_DATA } from '@/components/ResumePreview';
import { Wand2, Download, Save, Loader2, Sparkles, FileText, ChevronRight } from 'lucide-react';

export default function BuilderPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [resumeData, setResumeData] = useState<any>(MOCK_DATA);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic');

    const [formData, setFormData] = useState({
        personalInfo: {
            fullName: '', email: '', phone: '', location: '', linkedin: '', portfolio: ''
        },
        experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
        education: [{ institution: '', degree: '', graduationDate: '' }],
        skills: ''
    });

    const loadSampleData = () => {
        setFormData({
            personalInfo: MOCK_DATA.personalInfo,
            experience: MOCK_DATA.experience.map(exp => ({
                company: exp.company,
                role: exp.role,
                startDate: exp.startDate,
                endDate: exp.endDate,
                description: exp.achievements.join(', ')
            })),
            education: MOCK_DATA.education,
            skills: MOCK_DATA.skills.join(', ')
        });
        setResumeData(MOCK_DATA);
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);

        try {
            // Split skills strong by comma
            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    personalInfo: formData.personalInfo,
                    experience: formData.experience.map(e => ({
                        ...e,
                        achievements: e.description ? [e.description] : []
                    })),
                    education: formData.education,
                    skills: skillsArray
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error('Server error details:', errorData);
                throw new Error(errorData.error || errorData.details || 'Failed to generate resume');
            }

            const data = await res.json();
            setResumeData(data);

        } catch (error: any) {
            console.error('Generation failure:', error);
            alert(error.message || 'Error generating resume. Check console.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!resumeData) return;
        setIsSaving(true);
        try {
            const res = await fetch('/api/resumes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `${resumeData.personalInfo.fullName}'s Resume`,
                    content: resumeData,
                    templateId: selectedTemplate
                })
            });
            if (!res.ok) throw new Error('Failed to save');
            alert('Resume saved to your dashboard!');
        } catch (error) {
            console.error(error);
            alert('Error saving resume');
        } finally {
            setIsSaving(false);
        }
    };

    const downloadPDF = () => {
        window.print();
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-white selection:bg-blue-500/30">
            <Navbar />

            <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* Left Column: Form */}
                <div className="space-y-8 lg:pr-8 lg:border-r lg:border-white/10 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto no-scrollbar">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2 italic">Resume Details</h1>
                            <p className="text-zinc-400">Enter your raw details, and let our AI craft the perfect phrasing.</p>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={loadSampleData} className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Load Sample Data
                        </Button>
                    </div>

                    <form onSubmit={handleGenerate} className="space-y-8 glass p-6 sm:p-8 rounded-3xl">
                        {/* Personal Info */}
                        <div className="space-y-4 border-b border-white/10 pb-8">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">1</span>
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Full Name" required value={formData.personalInfo.fullName} onChange={e => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, fullName: e.target.value } })} />
                                <Input label="Email" required type="email" value={formData.personalInfo.email} onChange={e => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, email: e.target.value } })} />
                                <Input label="Phone" value={formData.personalInfo.phone} onChange={e => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, phone: e.target.value } })} />
                                <Input label="Location" placeholder="City, State" value={formData.personalInfo.location} onChange={e => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, location: e.target.value } })} />
                                <Input label="LinkedIn URL" value={formData.personalInfo.linkedin} onChange={e => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, linkedin: e.target.value } })} />
                                <Input label="Portfolio/Website" value={formData.personalInfo.portfolio} onChange={e => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, portfolio: e.target.value } })} />
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="space-y-4 border-b border-white/10 pb-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">2</span>
                                    Experience
                                </h2>
                                <Button type="button" variant="outline" size="sm" onClick={() => setFormData({ ...formData, experience: [...formData.experience, { company: '', role: '', startDate: '', endDate: '', description: '' }] })}>
                                    + Add Role
                                </Button>
                            </div>

                            {formData.experience.map((exp, i) => (
                                <div key={i} className="space-y-4 bg-white/5 p-4 inset-ring inset-ring-white/10 rounded-2xl">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input label="Company" value={exp.company} onChange={e => { const newExp = [...formData.experience]; newExp[i].company = e.target.value; setFormData({ ...formData, experience: newExp }) }} />
                                        <Input label="Role/Title" value={exp.role} onChange={e => { const newExp = [...formData.experience]; newExp[i].role = e.target.value; setFormData({ ...formData, experience: newExp }) }} />
                                        <Input label="Start Date" placeholder="e.g. Jan 2020" value={exp.startDate} onChange={e => { const newExp = [...formData.experience]; newExp[i].startDate = e.target.value; setFormData({ ...formData, experience: newExp }) }} />
                                        <Input label="End Date" placeholder="e.g. Present" value={exp.endDate} onChange={e => { const newExp = [...formData.experience]; newExp[i].endDate = e.target.value; setFormData({ ...formData, experience: newExp }) }} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-zinc-300 ml-1">Rough Description / Duties</label>
                                        <textarea
                                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 min-h-[100px]"
                                            placeholder="e.g. Led a team of 5, increased sales by 20%, built a python scraper..."
                                            value={exp.description}
                                            onChange={e => { const newExp = [...formData.experience]; newExp[i].description = e.target.value; setFormData({ ...formData, experience: newExp }) }}
                                        />
                                        <p className="text-xs text-zinc-500 ml-1 flex items-center gap-1 mt-1">
                                            <Sparkles className="w-3 h-3 text-blue-400" /> AI will expand and format this professionally.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Education */}
                        <div className="space-y-4 border-b border-white/10 pb-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm">3</span>
                                    Education
                                </h2>
                                <Button type="button" variant="outline" size="sm" onClick={() => setFormData({ ...formData, education: [...formData.education, { institution: '', degree: '', graduationDate: '' }] })}>
                                    + Add Education
                                </Button>
                            </div>

                            {formData.education.map((edu, i) => (
                                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 inset-ring inset-ring-white/10 rounded-2xl">
                                    <Input label="Institution" value={edu.institution} onChange={e => { const newEdu = [...formData.education]; newEdu[i].institution = e.target.value; setFormData({ ...formData, education: newEdu }) }} />
                                    <Input label="Degree" value={edu.degree} onChange={e => { const newEdu = [...formData.education]; newEdu[i].degree = e.target.value; setFormData({ ...formData, education: newEdu }) }} />
                                    <Input label="Graduation Date" placeholder="e.g. May 2024" value={edu.graduationDate} onChange={e => { const newEdu = [...formData.education]; newEdu[i].graduationDate = e.target.value; setFormData({ ...formData, education: newEdu }) }} />
                                </div>
                            ))}
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm">4</span>
                                Skills
                            </h2>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Comma-separated skills</label>
                                <textarea
                                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
                                    placeholder="e.g. JavaScript, React, System Design, Agile, Excel..."
                                    value={formData.skills}
                                    onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={isGenerating}>
                            <Wand2 className="w-5 h-5 mr-2" />
                            {isGenerating ? 'AI is crafting your resume...' : 'Generate with AI'}
                        </Button>
                    </form>
                </div>

                {/* Right Column: Preview */}
                <div className="lg:h-[calc(100vh-8rem)] lg:overflow-y-auto no-scrollbar rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col print:hidden shadow-inner">
                    <div className="sticky top-0 bg-black/80 backdrop-blur-md z-20 w-full p-4 lg:p-6 border-b border-white/10 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Preview & Customize</h2>
                            <div className="flex gap-2 relative z-20">
                                <Button variant="outline" size="sm" onClick={handleSave} disabled={!resumeData || isSaving}>
                                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save
                                </Button>
                                <Button size="sm" onClick={downloadPDF} disabled={!resumeData}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Export PDF
                                </Button>
                            </div>
                        </div>

                        {/* Template Selector */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 italic">Select Art Style</span>
                                <span className="text-[10px] text-zinc-600">{TEMPLATES.length} Styles Available</span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                {TEMPLATES.map((tpl) => (
                                    <button
                                        key={tpl.id}
                                        onClick={() => setSelectedTemplate(tpl.id)}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${selectedTemplate === tpl.id
                                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                                            : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/20 hover:text-zinc-300'
                                            }`}
                                    >
                                        {tpl.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center w-full p-4 lg:p-8">
                        {resumeData ? (
                            <div className="scale-[0.8] sm:scale-100 origin-top w-full flex justify-center">
                                {/* The actual resume preview logic that is styled for print */}
                                <div className="print:block print:w-full print:absolute print:inset-0 print:m-0 print:p-0">
                                    <ResumePreview data={resumeData} templateId={selectedTemplate} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-500 w-full max-w-sm text-center py-20">
                                <FileText className="w-16 h-16 mb-4 opacity-20" />
                                <h3 className="text-lg font-bold text-white mb-2">Ready to see your resume?</h3>
                                <p>Fill out the details on the left and click "Generate with AI" to see your professional resume preview here.</p>
                                <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-left">
                                    <p className="font-bold text-blue-400 mb-1 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Pro Tip</p>
                                    <p>Our AI analyzes your experience to highlight your achievements using industry-standard action verbs.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Print only styles to ensure sidebar doesn't print */}
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
