import React from 'react';
import { ResumeData } from '../ResumePreview';

const Section = ({ title, content }: { title: string; content: React.ReactNode }) => (
    <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-zinc-200 pb-1 mb-4 text-zinc-900">{title}</h2>
        {content}
    </div>
);

export const ClassicTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-12 font-serif">
        <div className="text-center border-b-2 border-zinc-300 pb-6 mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">{data.personalInfo.fullName}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-600">
                <span>{data.personalInfo.email}</span>
                {data.personalInfo.phone && <><span>•</span><span>{data.personalInfo.phone}</span></>}
                {data.personalInfo.location && <><span>•</span><span>{data.personalInfo.location}</span></>}
            </div>
        </div>
        <Section title="Summary" content={<p className="text-[15px] leading-relaxed">{data.summary}</p>} />
        <Section title="Experience" content={
            <div className="space-y-5">
                {data.experience.map((exp, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-semibold text-zinc-900">{exp.role}</h3>
                            <span className="text-sm font-medium text-zinc-600">{exp.startDate} – {exp.endDate}</span>
                        </div>
                        <div className="text-[15px] font-medium text-zinc-700 italic mb-2">{exp.company}</div>
                        <ul className="list-disc ml-4 space-y-1 text-[14px]">
                            {exp.achievements?.map((ach, j) => <li key={j}>{ach}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        } />
        <Section title="Education" content={
            <div className="space-y-4">
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-baseline">
                        <div>
                            <h3 className="font-semibold text-zinc-900">{edu.degree}</h3>
                            <div className="text-[15px] text-zinc-700">{edu.institution}</div>
                        </div>
                        <span className="text-sm font-medium text-zinc-600">{edu.graduationDate}</span>
                    </div>
                ))}
            </div>
        } />
        <Section title="Skills" content={<div className="flex flex-wrap gap-2 text-[14px]">{data.skills.join(' • ')}</div>} />
    </div>
);
