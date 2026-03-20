import React from 'react';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { SidebarTemplate } from './templates/SidebarTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { FuturisticTemplate } from './templates/FuturisticTemplate';
import { GlassmorphismTemplate } from './templates/GlassmorphismTemplate';
import { EditorialTemplate } from './templates/EditorialTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { VibrantTemplate } from './templates/VibrantTemplate';

export type ResumeData = {
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

export const TEMPLATES = [
    { id: 'classic', name: 'Classic Professional' },
    { id: 'modern', name: 'Modern Clean' },
    { id: 'minimal', name: 'Minimalist' },
    { id: 'sidebar-left', name: 'Creative Sidebar (Left)' },
    { id: 'sidebar-right', name: 'Royal Sidebar (Right)' },
    { id: 'executive', name: 'Executive' },
    { id: 'tech', name: 'Tech Startup' },
    { id: 'elegant', name: 'Elegant Serif' },
    { id: 'compact', name: 'Compact' },
    { id: 'futuristic', name: 'Futuristic' },
    { id: 'glass', name: 'Glassmorphism' },
    { id: 'editorial', name: 'Editorial' },
    { id: 'corporate', name: 'Corporate Blue' },
    { id: 'vibrant', name: 'Vibrant Gradient' },
] as const;

export type TemplateId = typeof TEMPLATES[number]['id'];

export const MOCK_DATA: ResumeData = {
    personalInfo: {
        fullName: 'Alexander Sterling',
        email: 'alex.sterling@example.com',
        phone: '+1 (555) 012-3456',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexsterling',
        portfolio: 'alexsterling.dev'
    },
    summary: 'Senior Software Architect with over 10 years of experience in building scalable distributed systems and cloud-native applications. Proven track record of leading cross-functional teams and delivering high-impact technical solutions.',
    experience: [
        {
            company: 'TechFlow Systems',
            role: 'Lead Software Architect',
            startDate: 'Jan 2020',
            endDate: 'Present',
            achievements: [
                'Spearheaded the migration of monolithic architecture to microservices, reducing deployment time by 60%.',
                'Optimized database queries and caching layers, leading to a 40% improvement in system latency.',
                'Mentored a team of 15 engineers and established best practices for CI/CD and automated testing.'
            ]
        },
        {
            company: 'InnovaTech Solutions',
            role: 'Senior Full Stack Developer',
            startDate: 'Mar 2015',
            endDate: 'Dec 2019',
            achievements: [
                'Developed and launched a customer-facing portal that increased user engagement by 25%.',
                'Integrated multiple third-party APIs for real-time data processing and analytics.',
                'Collaborated with UX designers to implement responsive and intuitive user interfaces.'
            ]
        }
    ],
    education: [
        {
            institution: 'Massachusetts Institute of Technology (MIT)',
            degree: 'Master of Science in Computer Science',
            graduationDate: 'May 2015'
        },
        {
            institution: 'Stanford University',
            degree: 'Bachelor of Science in Software Engineering',
            graduationDate: 'May 2013'
        }
    ],
    skills: ['System Architecture', 'Node.js', 'React/Next.js', 'PostgreSQL', 'AWS/GCP', 'Kubernetes', 'Python', 'Go', 'Distributed Systems', 'Agile Methodology']
};

export default function ResumePreview({ data, templateId = 'classic' }: { data: ResumeData | null; templateId?: TemplateId }) {
    const activeData = data || MOCK_DATA;

    const renderTemplate = () => {
        switch (templateId) {
            case 'modern': return <ModernTemplate data={activeData} />;
            case 'minimal': return <MinimalTemplate data={activeData} />;
            case 'sidebar-left': return <SidebarTemplate data={activeData} sidebar="left" />;
            case 'sidebar-right': return <SidebarTemplate data={activeData} sidebar="right" />;
            case 'executive': return <ExecutiveTemplate data={activeData} />;
            case 'tech': return <TechTemplate data={activeData} />;
            case 'elegant': return <ElegantTemplate data={activeData} />;
            case 'compact': return <CompactTemplate data={activeData} />;
            case 'futuristic': return <FuturisticTemplate data={activeData} />;
            case 'glass': return <GlassmorphismTemplate data={activeData} />;
            case 'editorial': return <EditorialTemplate data={activeData} />;
            case 'corporate': return <CorporateTemplate data={activeData} />;
            case 'vibrant': return <VibrantTemplate data={activeData} />;
            case 'classic':
            default: return <ClassicTemplate data={activeData} />;
        }
    };

    return (
        <div id="resume-preview" className="w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-2xl relative bg-white text-black overflow-hidden print:shadow-none">
            {renderTemplate()}
        </div>
    );
}
