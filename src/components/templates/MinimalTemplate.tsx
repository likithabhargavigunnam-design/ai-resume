import React from 'react';
import { ResumeData } from '../ResumePreview';

export const MinimalTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-16 font-sans text-zinc-800">
        <header className="mb-12">
            <h1 className="text-3xl font-light tracking-widest uppercase mb-4">{data.personalInfo.fullName}</h1>
            <div className="text-xs tracking-tight text-zinc-400 space-x-4">
                <span>{data.personalInfo.email}</span>
                <span>{data.personalInfo.phone}</span>
                <span>{data.personalInfo.location}</span>
            </div>
        </header>
        <div className="space-y-12">
            <section>
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-4 font-bold border-b border-zinc-100 pb-2">About</h2>
                <p className="text-sm leading-relaxed max-w-2xl">{data.summary}</p>
            </section>
            <section>
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-4 font-bold border-b border-zinc-100 pb-2">Experience</h2>
                <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4">
                            <div className="text-[10px] uppercase text-zinc-400 pt-1">{exp.startDate} - {exp.endDate}</div>
                            <div className="col-span-3">
                                <h3 className="text-sm font-bold mb-1">{exp.role}</h3>
                                <div className="text-xs text-zinc-500 mb-3">{exp.company}</div>
                                <ul className="space-y-2 text-xs leading-relaxed text-zinc-600">
                                    {exp.achievements?.map((ach, j) => <li key={j}>• {ach}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-4 font-bold border-b border-zinc-100 pb-2">Expertise</h2>
                <div className="text-xs leading-loose text-zinc-500">{data.skills.join(' / ')}</div>
            </section>
        </div>
    </div>
);
