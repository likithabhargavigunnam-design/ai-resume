import React from 'react';
import { ResumeData } from '../ResumePreview';

export const ExecutiveTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-12 font-serif text-zinc-900">
        <header className="border-l-8 border-zinc-900 pl-6 mb-12">
            <h1 className="text-5xl font-black uppercase tracking-tight mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-sm tracking-[0.3em] font-medium text-zinc-500">{data.experience[0]?.role}</p>
        </header>
        <div className="space-y-10">
            <div className="flex gap-12 text-sm">
                <div className="w-1/3 font-bold uppercase tracking-widest text-zinc-400 text-[10px]">Contact Details</div>
                <div className="w-2/3 flex gap-6 text-zinc-600">
                    <span>{data.personalInfo.email}</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>{data.personalInfo.location}</span>
                </div>
            </div>
            <hr className="border-zinc-100" />
            <div className="flex gap-12">
                <div className="w-1/3 font-bold uppercase tracking-widest text-zinc-400 text-[10px] pt-1">Executive Summary</div>
                <p className="w-2/3 text-[15px] leading-relaxed font-medium">{data.summary}</p>
            </div>
            <div className="flex gap-12">
                <div className="w-1/3 font-bold uppercase tracking-widest text-zinc-400 text-[10px] pt-1">Career History</div>
                <div className="w-2/3 space-y-8">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-lg font-bold">{exp.company}</h3>
                                <span className="text-xs font-bold text-zinc-400 uppercase">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-sm font-bold text-zinc-600 mb-3 italic">{exp.role}</div>
                            <ul className="space-y-2 text-sm leading-relaxed">
                                {exp.achievements?.map((ach, j) => <li key={j} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-zinc-300">{ach}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
