import React from 'react';
import { ResumeData } from '../ResumePreview';

const ModernSection = ({ title, content }: { title: string; content: React.ReactNode }) => (
    <div>
        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">{title}</h2>
        {content}
    </div>
);

export const ModernTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-10 font-sans">
        <div className="mb-8">
            <h1 className="text-5xl font-extrabold text-blue-700 mb-2 uppercase tracking-tighter">{data.personalInfo.fullName}</h1>
            <div className="flex gap-4 text-sm font-medium text-zinc-500">
                <span>{data.personalInfo.email}</span>
                <span>{data.personalInfo.phone}</span>
                <span>{data.personalInfo.location}</span>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
                <ModernSection title="Profile" content={<p className="text-zinc-700 leading-snug">{data.summary}</p>} />
                <ModernSection title="Work Experience" content={
                    <div className="space-y-6">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-zinc-900">{exp.role}</h3>
                                <div className="text-blue-600 font-semibold text-sm mb-2">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                                <ul className="list-square ml-4 space-y-1 text-[14px] text-zinc-700">
                                    {exp.achievements?.map((ach, j) => <li key={j}>{ach}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                } />
            </div>
            <div className="space-y-8">
                <ModernSection title="Skills" content={
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((s, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">{s}</span>
                        ))}
                    </div>
                } />
                <ModernSection title="Education" content={
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <div className="font-bold text-zinc-900 text-sm">{edu.degree}</div>
                                <div className="text-zinc-600 text-xs">{edu.institution}</div>
                                <div className="text-zinc-400 text-[10px] uppercase font-bold">{edu.graduationDate}</div>
                            </div>
                        ))}
                    </div>
                } />
            </div>
        </div>
    </div>
);
