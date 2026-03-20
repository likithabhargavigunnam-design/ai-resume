import React from 'react';
import { ResumeData } from '../ResumePreview';

export const CompactTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-8 font-sans text-zinc-900 text-[12px]">
        <header className="flex justify-between items-center border-b-2 border-zinc-900 pb-4 mb-4">
            <div>
                <h1 className="text-3xl font-black uppercase leading-none">{data.personalInfo.fullName}</h1>
                <p className="font-bold text-blue-600">{data.experience[0]?.role}</p>
            </div>
            <div className="text-right leading-tight">
                <p>{data.personalInfo.email}</p>
                <p>{data.personalInfo.phone}</p>
                <p>{data.personalInfo.location}</p>
            </div>
        </header>
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 space-y-4">
                <section>
                    <h2 className="font-black uppercase border-b border-zinc-200 mb-2">Work History</h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between font-bold">
                                    <span>{exp.role}</span>
                                    <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-zinc-500 italic mb-1">{exp.company}</div>
                                <ul className="list-disc ml-4 space-y-0.5">
                                    {exp.achievements?.map((ach, j) => <li key={j}>{ach}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="col-span-4 space-y-4">
                <section>
                    <h2 className="font-black uppercase border-b border-zinc-200 mb-2">Education</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-2">
                            <div className="font-bold">{edu.degree}</div>
                            <div className="text-zinc-500">{edu.institution}</div>
                        </div>
                    ))}
                </section>
                <section>
                    <h2 className="font-black uppercase border-b border-zinc-200 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                        {data.skills.map((s, i) => (
                            <span key={i} className="bg-zinc-100 px-2 py-0.5 rounded text-[10px] font-medium">{s}</span>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="font-black uppercase border-b border-zinc-200 mb-2">Contact</h2>
                    <div className="space-y-1 text-zinc-600 truncate">
                        <p>{data.personalInfo.linkedin}</p>
                        <p>{data.personalInfo.portfolio}</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
);
