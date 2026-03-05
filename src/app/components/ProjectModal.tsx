"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/data/project'

interface ProjectModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    // Close modal on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden' // Prevent background scrolling
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen || !project) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <img 
                            src={`/logos/client_logos/square_logos/${project.logo}sqlogo.png`}
                            alt=""
                            className="w-14 h-14 object-contain rounded-lg border border-gray-200"
                        />
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {project.title}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 text-2xl font-bold transition-colors"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Overview</h3>
                        <p className="text-gray-700 leading-relaxed">{project.description?.summary ?? project.metaDescription}</p>
                    </div>

                    {/* Architecture + Key outcomes side by side */}
                    {(project.description?.architectureDiagram || (project.description?.outcomes && project.description.outcomes.length > 0)) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.description?.architectureDiagram && (
                                <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50/50">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-4 pt-4 pb-2">Architecture</h3>
                                    <div className="p-4 pt-0">
                                        <img
                                            src={project.description.architectureDiagram}
                                            alt="Architecture overview"
                                            className="w-full max-h-48 object-contain rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}
                            {project.description?.outcomes && project.description.outcomes.length > 0 && (
                                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/30">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Key outcomes</h3>
                                    <ul className="text-gray-700 text-sm space-y-1">
                                        {project.description.outcomes.slice(0, 4).map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-mycolors-orange mt-0.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile preview (phone screenshots) — only when present; image repeats horizontally within container */}
                    {project.description?.phoneScreenshots && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Mobile preview</h3>
                            <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50/50">
                                <div
                                    className="h-56 w-full overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${project.description.phoneScreenshots})`,
                                        backgroundRepeat: 'repeat-x',
                                        backgroundSize: 'auto 100%',
                                        backgroundPosition: '-25% center',
                                    }}
                                    role="img"
                                    aria-label={`${project.title} mobile preview`}
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* Technologies (left) | Key achievements + Design tools stacked (right) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/30 min-h-[100px] flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 shrink-0">Technologies & skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {project.special && project.special.length > 0 && (
                                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/30 min-h-[80px] flex flex-col">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 shrink-0">Key achievements</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.special.map((skill, index) => (
                                            <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {project.design && project.design.length > 0 && (
                                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/30 min-h-[80px] flex flex-col">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 shrink-0">Design tools</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.design.map((skill, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Footer with buttons side by side */}
                <div className="border-t border-gray-200 p-6 bg-gray-50 flex flex-wrap gap-3">
                    {project.description && (
                        <Link
                            href={`/portfolio/${project.slug}`}
                            onClick={onClose}
                            className="inline-flex items-center justify-center flex-1 min-w-[200px] px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-mycolors-orange transition-colors duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            View Full Case Study
                        </Link>
                    )}
                    {project.url && project.url.length > 0 && (
                        <a
                            href={project.url[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center flex-1 min-w-[200px] px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-mycolors-orange transition-colors duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span>{project.url[1]}</span>
                            <svg 
                                className="ml-2 w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
