import React from 'react';
import { ResumeData } from '../ResumePreview';

export const SidebarTemplate = ({ data, sidebar }: { data: ResumeData, sidebar: 'left' | 'right' }) => (
    <div className={`flex h-[297mm] ${sidebar === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-1/3 p-10 ${sidebar === 'right' ? 'bg-zinc-900 text-white' : 'bg-blue-900 text-white'}`}>
            <div className="mb-10 text-center">
                <div className="w-32 h-32 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
                    {data.personalInfo.fullName.charAt(0)}
                </div>
                <h1 className="text-2xl font-bold leading-tight mb-2">{data.personalInfo.fullName}</h1>
                <p className="text-xs text-white/60 mb-8 uppercase tracking-widest">{data.experience[0]?.role}</p>
            </div>
            <div className="space-y-8">
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Contact</h2>
                    <div className="text-xs space-y-2 text-white/80">
                        <p>{data.personalInfo.email}</p>
                        <p>{data.personalInfo.phone}</p>
                        <p>{data.personalInfo.location}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((s, i) => (
                            <span key={i} className="bg-white/10 px-2 py-1 rounded text-[10px]">{s}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="w-2/3 p-12 bg-white text-zinc-800 space-y-10 overflow-y-auto">
            <section>
                <h2 className="text-lg font-bold text-zinc-900 border-b-2 border-zinc-100 pb-2 mb-4">Summary</h2>
                <p className="text-sm leading-relaxed">{data.summary}</p>
            </section>
            <section>
                <h2 className="text-lg font-bold text-zinc-900 border-b-2 border-zinc-100 pb-2 mb-4">Experience</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-zinc-900">{exp.role}</h3>
                                <span className="text-[10px] font-bold text-zinc-400">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-sm text-blue-600 font-medium mb-2">{exp.company}</div>
                            <ul className="list-disc ml-4 text-xs space-y-1 text-zinc-600">
                                {exp.achievements?.map((ach, j) => <li key={j}>{ach}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-lg font-bold text-zinc-900 border-b-2 border-zinc-100 pb-2 mb-4">Education</h2>
                <div className="space-y-4">
                    {data.education.map((edu, i) => (
                        <div key={i}>
                            <h3 className="text-sm font-bold">{edu.degree}</h3>
                            <p className="text-xs text-zinc-500">{edu.institution} | {edu.graduationDate}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
);
