import React from 'react';

type ResumeData = {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        portfolio: string;
    };
    summary: string;
    experience: {
        company: string;
        role: string;
        startDate: string;
        endDate: string;
        achievements: string[];
    }[];
    education: {
        institution: string;
        degree: string;
        graduationDate: string;
    }[];
    skills: string[];
};

export default function ResumePreview({ data }: { data: ResumeData }) {
    if (!data) return null;

    return (
        <div id="resume-preview" className="bg-white text-black p-8 sm:p-12 w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-2xl relative">
            <div className="text-center border-b-2 border-zinc-300 pb-6 mb-6">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-zinc-900 mb-2">
                    {data.personalInfo?.fullName || 'John Doe'}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-zinc-600">
                    {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo?.phone && (
                        <>
                            <span className="text-zinc-300">•</span>
                            <span>{data.personalInfo.phone}</span>
                        </>
                    )}
                    {data.personalInfo?.location && (
                        <>
                            <span className="text-zinc-300">•</span>
                            <span>{data.personalInfo.location}</span>
                        </>
                    )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-blue-600 mt-1">
                    {data.personalInfo?.linkedin && <a href={data.personalInfo.linkedin}>{data.personalInfo.linkedin}</a>}
                    {data.personalInfo?.portfolio && (
                        <>
                            <span className="text-zinc-300">•</span>
                            <a href={data.personalInfo.portfolio}>{data.personalInfo.portfolio}</a>
                        </>
                    )}
                </div>
            </div>

            {data.summary && (
                <div className="mb-6">
                    <p className="text-[15px] leading-relaxed text-zinc-800">{data.summary}</p>
                </div>
            )}

            {data.experience && data.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b border-zinc-200 pb-1 mb-4 text-zinc-900">
                        Professional Experience
                    </h2>
                    <div className="space-y-5">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-zinc-900">{exp.role}</h3>
                                    <span className="text-sm font-medium text-zinc-600">
                                        {exp.startDate} – {exp.endDate}
                                    </span>
                                </div>
                                <div className="text-[15px] font-medium text-zinc-700 italic mb-2">
                                    {exp.company}
                                </div>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-[14px] text-zinc-800">
                                    {exp.achievements?.map((ach, j) => (
                                        <li key={j} className="pl-1 leading-relaxed">{ach}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {data.education && data.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b border-zinc-200 pb-1 mb-4 text-zinc-900">
                        Education
                    </h2>
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
                </div>
            )}

            {data.skills && data.skills.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b border-zinc-200 pb-1 mb-3 text-zinc-900">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2 text-[14px] text-zinc-800">
                        {data.skills.join(' • ')}
                    </div>
                </div>
            )}
        </div>
    );
}
