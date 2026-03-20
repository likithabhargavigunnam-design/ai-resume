import React from 'react';
import { ResumeData } from '../ResumePreview';

export const EditorialTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-16 font-serif bg-[#fdfcf8] text-zinc-900 border-[20px] border-zinc-900/5 h-[297mm] overflow-y-auto">
        <header className="mb-16 border-b-4 border-zinc-900 pb-8 flex justify-between items-end">
            <div>
                <p className="text-xs uppercase tracking-[0.5em] font-black mb-4 text-zinc-400 italic">Portfolio • {new Date().getFullYear()}</p>
                <h1 className="text-7xl font-black tracking-tighter leading-none">{data.personalInfo.fullName.split(' ')[0]}<br /><span className="text-zinc-400 italic font-light">{data.personalInfo.fullName.split(' ')[1]}</span></h1>
            </div>
            <div className="text-right text-sm italic space-y-1">
                <p>{data.personalInfo.email}</p>
                <p>{data.personalInfo.location}</p>
                <p className="font-bold underline pt-4 not-italic uppercase tracking-widest text-[10px]">Confidential Resume</p>
            </div>
        </header>
        <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12">
                <p className="text-3xl font-light leading-relaxed italic border-l-4 border-zinc-200 pl-8 text-zinc-600 mb-16">
                    {data.summary}
                </p>
            </div>
            <div className="col-span-8 space-y-16">
                <section>
                    <h2 className="text-xs uppercase tracking-[0.4em] font-black border-b border-zinc-200 pb-2 mb-8 mt-4">Professional Record</h2>
                    <div className="space-y-12">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight">{exp.role}</h3>
                                        <p className="text-sm italic text-zinc-500">{exp.company}</p>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 transform rotate-90 origin-right whitespace-nowrap">{exp.startDate} / {exp.endDate}</span>
                                </div>
                                <ul className="text-sm space-y-3 leading-relaxed text-zinc-700 max-w-xl">
                                    {exp.achievements.map((ach, j) => <li key={j} className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-zinc-300">{ach}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="col-span-4 space-y-12">
                <section>
                    <h2 className="text-xs uppercase tracking-[0.4em] font-black border-b border-zinc-200 pb-2 mb-6">Expertise</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.skills.map((s, i) => (
                            <div key={i} className="text-xs font-bold flex items-center justify-between group">
                                <span className="uppercase tracking-widest">{s}</span>
                                <div className="h-px bg-zinc-100 flex-1 mx-4 group-hover:bg-zinc-900 transition-colors"></div>
                                <span className="text-zinc-300 font-light italic">Exp.</span>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-xs uppercase tracking-[0.4em] font-black border-b border-zinc-200 pb-2 mb-6">Education</h2>
                    <div className="space-y-6">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="text-sm font-bold">{edu.degree}</h3>
                                <p className="text-xs italic text-zinc-500">{edu.institution}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
        <footer className="mt-20 pt-8 border-t border-zinc-100 flex justify-between items-center text-[8px] uppercase tracking-[0.6em] font-black text-zinc-300">
            <span>RESUME FRAMEWORK V4.0</span>
            <span>INTEN.PRO PROPRIETARY</span>
            <span>PAGE 01 / 01</span>
        </footer>
    </div>
);
