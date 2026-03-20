import React from 'react';
import { ResumeData } from '../ResumePreview';

export const VibrantTemplate = ({ data }: { data: ResumeData }) => (
    <div className="p-2 font-sans bg-zinc-100 min-h-[297mm]">
        <div className="bg-white shadow-sm rounded-[2rem] overflow-hidden min-h-full flex flex-col">
            <header className="bg-gradient-to-r from-violet-600 to-indigo-600 p-12 text-white">
                <h1 className="text-6xl font-black tracking-tighter mb-4">{data.personalInfo.fullName}</h1>
                <p className="text-xl font-medium opacity-90 mb-6">{data.experience[0]?.role}</p>
                <div className="flex flex-wrap gap-6 text-sm opacity-80 font-medium">
                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">{data.personalInfo.email}</span>
                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">{data.personalInfo.phone}</span>
                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">{data.personalInfo.location}</span>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-12 gap-0">
                <aside className="col-span-4 bg-zinc-50 p-10 space-y-10 border-r border-zinc-100">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-violet-600 mb-6">Expertise</h2>
                        <div className="flex flex-col gap-3">
                            {data.skills.map((s, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <span className="text-sm font-bold text-zinc-700">{s}</span>
                                    <div className="h-1.5 w-12 bg-zinc-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-violet-600 mb-6">Background</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="text-sm font-bold text-zinc-800">{edu.degree}</h3>
                                    <p className="text-xs text-zinc-500">{edu.institution}</p>
                                    <p className="text-[10px] font-black text-zinc-400 mt-1 uppercase tracking-widest">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>

                <main className="col-span-8 p-12 space-y-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 flex items-center gap-4">
                            Summary <span className="h-px flex-1 bg-zinc-100"></span>
                        </h2>
                        <p className="text-lg font-medium leading-relaxed text-zinc-600 italic">
                            "{data.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-8 flex items-center gap-4">
                            Experience <span className="h-px flex-1 bg-zinc-100"></span>
                        </h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full before:z-10 after:content-[''] after:absolute after:left-[3.5px] after:top-4 after:bottom-[-2.5rem] after:w-px after:bg-zinc-100 last:after:hidden">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold text-zinc-900">{exp.role}</h3>
                                        <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full uppercase tracking-tighter">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-bold text-indigo-600 mb-4">{exp.company}</p>
                                    <ul className="space-y-3">
                                        {exp.achievements.map((ach, j) => (
                                            <li key={j} className="text-sm text-zinc-600 leading-relaxed flex gap-3">
                                                <span className="text-indigo-400 font-bold">→</span>
                                                {ach}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    </div>
);
