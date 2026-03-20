import React from 'react';
import { ResumeData } from '../ResumePreview';

export const TechTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-10 font-mono text-zinc-800">
        <div className="bg-zinc-900 text-cyan-400 p-8 rounded-t-lg">
            <h1 className="text-4xl font-bold mb-4">{'>'} {data.personalInfo.fullName}</h1>
            <div className="grid grid-cols-2 gap-4 text-xs opacity-80">
                <div>EMAIL: {data.personalInfo.email}</div>
                <div>PHONE: {data.personalInfo.phone}</div>
                <div>LOCATION: {data.personalInfo.location}</div>
                <div>W3: {data.personalInfo.portfolio || 'N/A'}</div>
            </div>
        </div>
        <div className="bg-white border-x-2 border-b-2 border-zinc-900 p-8 rounded-b-lg space-y-8">
            <section>
                <h2 className="text-sm font-bold text-zinc-400 uppercase mb-4 tracking-tighter">01. core_dump</h2>
                <p className="text-sm leading-tight text-zinc-600">{data.summary}</p>
            </section>
            <section>
                <h2 className="text-sm font-bold text-zinc-400 uppercase mb-4 tracking-tighter">02. stack</h2>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((s, i) => (
                        <span key={i} className="bg-zinc-100 border border-zinc-200 px-3 py-1 rounded text-[11px] font-bold">#{s}</span>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-sm font-bold text-zinc-400 uppercase mb-4 tracking-tighter">03. execution_history</h2>
                <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="relative pl-6 border-l-2 border-zinc-100">
                            <div className="absolute -left-[5px] top-1 w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <h3 className="text-sm font-black">{exp.role} @ {exp.company}</h3>
                            <p className="text-[10px] text-zinc-400 mb-2">{exp.startDate} - {exp.endDate}</p>
                            <ul className="text-xs space-y-2 text-zinc-600">
                                {exp.achievements?.map((ach, j) => <li key={j}>* {ach}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
);
