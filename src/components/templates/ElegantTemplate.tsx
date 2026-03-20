import React from 'react';
import { ResumeData } from '../ResumePreview';

export const ElegantTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-14 font-serif text-zinc-800">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-light italic tracking-[0.2em] text-zinc-900 mb-4">{data.personalInfo.fullName}</h1>
            <div className="w-20 h-px bg-zinc-300 mx-auto mb-4"></div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">{data.personalInfo.email} | {data.personalInfo.location}</p>
        </div>
        <div className="space-y-12">
            <div className="grid grid-cols-5 gap-10">
                <div className="text-[10px] font-bold uppercase tracking-widest pt-2">Personal info</div>
                <div className="col-span-4 text-sm leading-relaxed italic text-zinc-600">{data.summary}</div>
            </div>
            <div className="grid grid-cols-5 gap-10">
                <div className="text-[10px] font-bold uppercase tracking-widest pt-2">Journey</div>
                <div className="col-span-4 space-y-10">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline mb-3">
                                <h3 className="text-lg font-light text-zinc-900">{exp.role}</h3>
                                <span className="text-[10px] uppercase text-zinc-400 tracking-widest">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">{exp.company}</div>
                            <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
                                {exp.achievements?.map((ach, j) => <li key={j} className="pl-6 relative before:content-['—'] before:absolute before:left-0 before:text-zinc-300">{ach}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
