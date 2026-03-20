import React from 'react';
import { ResumeData } from '../ResumePreview';

export const CorporateTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-12 font-sans text-zinc-900 bg-white min-h-[297mm]">
        <header className="border-b-4 border-blue-900 pb-6 mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 uppercase text-blue-900">{data.personalInfo.fullName}</h1>
            <div className="flex flex-wrap gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <span>{data.personalInfo.location}</span>
                <span>•</span>
                <span>{data.personalInfo.phone}</span>
                <span>•</span>
                <span>{data.personalInfo.email}</span>
            </div>
        </header>

        <div className="space-y-8">
            <section>
                <h2 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em] mb-3 border-b border-zinc-100 pb-1">Professional Profile</h2>
                <p className="text-sm leading-relaxed text-zinc-700">{data.summary}</p>
            </section>

            <section>
                <h2 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em] mb-4 border-b border-zinc-100 pb-1">Experience</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-zinc-900">{exp.company}</h3>
                                <span className="text-xs font-bold text-zinc-500 uppercase">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="text-sm font-bold text-blue-800 italic mb-2">{exp.role}</p>
                            <ul className="list-disc ml-4 space-y-1.5 text-sm text-zinc-700">
                                {exp.achievements.map((ach, j) => <li key={j}>{ach}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-2 gap-10">
                <section>
                    <h2 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em] mb-3 border-b border-zinc-100 pb-1">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-zinc-900 text-sm">{edu.degree}</h3>
                                <p className="text-xs text-zinc-500">{edu.institution} | {edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em] mb-3 border-b border-zinc-100 pb-1">Core Competencies</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {data.skills.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                                <span className="w-1.5 h-1.5 bg-blue-900 rotate-45"></span>
                                {s}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);
