import React from 'react';
import { ResumeData } from '../ResumePreview';

export const FuturisticTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-10 font-sans bg-zinc-50 text-zinc-900 border-[12px] border-white h-[297mm]">
        <div className="bg-white p-10 h-full shadow-sm rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full"></div>
            <header className="mb-12 relative">
                <h1 className="text-6xl font-black tracking-tighter text-indigo-900 mb-4">{data.personalInfo.fullName.split(' ')[0]}<span className="text-indigo-400">.</span></h1>
                <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">{data.personalInfo.location || 'Remote'}</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">{data.personalInfo.email}</span>
                </div>
            </header>
            <div className="space-y-10">
                <section>
                    <p className="text-xl font-medium leading-tight text-zinc-600 max-w-xl italic">"{data.summary}"</p>
                </section>
                <div className="grid grid-cols-2 gap-10">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black tracking-tighter border-b-4 border-indigo-100 inline-block pb-1">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.slice(0, 3).map((exp, i) => (
                                <div key={i} className="group">
                                    <h3 className="font-bold text-indigo-900 transition-colors group-hover:text-indigo-600">{exp.role}</h3>
                                    <p className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-widest">{exp.company}</p>
                                    <p className="text-xs leading-relaxed text-zinc-500 line-clamp-2">{exp.achievements[0]}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter border-b-4 border-indigo-100 inline-block pb-1 mb-6">Capabilities</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {data.skills.slice(0, 10).map((s, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter border-b-4 border-indigo-100 inline-block pb-1 mb-6">Education</h2>
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <div className="absolute bottom-10 left-10 text-[10px] font-black uppercase tracking-[1em] text-zinc-200">System.Resume.Active</div>
        </div>
    </div>
);
