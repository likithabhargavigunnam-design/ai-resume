import React from 'react';
import { ResumeData } from '../ResumePreview';

export const GlassmorphismTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-10 font-sans bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-[297mm] flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2.5rem] p-12 w-full h-full shadow-2xl text-white overflow-y-auto">
            <header className="mb-12">
                <h1 className="text-5xl font-black tracking-tight mb-2 drop-shadow-lg">{data.personalInfo.fullName}</h1>
                <p className="text-lg font-medium opacity-90">{data.experience[0]?.role}</p>
                <div className="mt-4 flex gap-4 text-sm opacity-70">
                    <span>{data.personalInfo.email}</span>
                    <span>{data.personalInfo.location}</span>
                </div>
            </header>
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-10">
                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">01</span>
                            Summary
                        </h2>
                        <p className="text-sm leading-relaxed opacity-90">{data.summary}</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">02</span>
                            Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{exp.role}</h3>
                                        <span className="text-xs opacity-60 font-mono tracking-tighter">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-medium opacity-80 mb-4">{exp.company}</p>
                                    <ul className="text-xs space-y-2 opacity-70">
                                        {exp.achievements.map((ach, j) => <li key={j}>• {ach}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="col-span-4 space-y-10">
                    <section>
                        <h2 className="text-xl font-bold mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((s, i) => (
                                <span key={i} className="bg-white/20 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-tight border border-white/5">{s}</span>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold mb-4">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <h3 className="text-xs font-bold">{edu.degree}</h3>
                                    <p className="text-[10px] opacity-70">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
);
