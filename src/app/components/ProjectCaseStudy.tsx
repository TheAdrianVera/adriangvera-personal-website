'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project, ProjectDescription } from '@/data/project'

interface ProjectCaseStudyProps {
    project: Project
    desc: ProjectDescription
}

export function ProjectCaseStudy({ project, desc }: ProjectCaseStudyProps) {
    const [diagramOpen, setDiagramOpen] = useState(false)

    useEffect(() => {
        if (!diagramOpen) return
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDiagramOpen(false)
        }
        document.addEventListener('keydown', handleEsc)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [diagramOpen])

    const lightbox = diagramOpen && desc.architectureDiagram && typeof document !== 'undefined' && createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85"
                onClick={() => setDiagramOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged architecture diagram"
        >
            {/* Content wrapper: clicks on image/button don't close; only backdrop closes */}
            <div
                className="relative inline-block max-w-[95vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={desc.architectureDiagram}
                    alt="Architecture diagram"
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                />
                <button
                    type="button"
                    onClick={() => setDiagramOpen(false)}
                    className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/85"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>,
        document.body
    )

    return (
        <div className="text-black space-y-12">
            {/* Top: Overview + Diagram side by side — diagram higher on page */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
                    <p className="text-gray-700 leading-relaxed">{desc.overview}</p>
                </div>
                {desc.architectureDiagram && (
                    <div className="lg:sticky lg:top-24 order-first lg:order-none">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Architecture</h2>
                        <button
                            type="button"
                            onClick={() => setDiagramOpen(true)}
                            className="block w-full text-left rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:ring-2 hover:ring-mycolors-orange hover:ring-offset-2 transition-shadow focus:outline-none focus:ring-2 focus:ring-mycolors-orange focus:ring-offset-2"
                        >
                            <img
                                src={desc.architectureDiagram}
                                alt="Architecture diagram (click to enlarge)"
                                className="w-full max-w-lg cursor-zoom-in"
                            />
                        </button>
                        <p className="text-xs text-gray-500 mt-1">Click to enlarge</p>
                        {lightbox}
                    </div>
                )}
            </section>

            {/* Challenge | Role side by side */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {desc.challenge && desc.challenge.length > 0 && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Challenge</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                            {desc.challenge.map((item, i) => (
                                <p key={i}>{item}</p>
                            ))}
                        </ul>
                    </div>
                )}
                {desc.role && desc.role.length > 0 && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">My role</h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {desc.role.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            {/* Phone screenshots (mobile preview) — when present */}
            {desc.phoneScreenshots && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Mobile Preview</h2>
                    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-gray-50/30">
                        <img
                            src={desc.phoneScreenshots}
                            alt="Mobile view screenshots"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </section>
            )}


            {/* Evolution: accordion (collapsible phases) */}
            {desc.evolution && desc.evolution.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Evolution</h2>
                    <div className="space-y-2">
                        {desc.evolution.map((phase) => (
                            <details
                                key={phase.phaseNumber}
                                className="group rounded-xl border border-gray-200 bg-white overflow-hidden"
                            >
                                <summary className="flex items-center gap-3 cursor-pointer list-none px-5 py-4 hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                                    <span className="font-semibold text-gray-900 min-w-[220px]">
                                        Phase {phase.phaseNumber}: {phase.phaseTitle}
                                    </span>
                                    <span className="text-gray-500 text-sm">{phase.phaseYear}</span>
                                    <svg
                                        className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 ml-auto"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-5 pb-4 pt-0 border-t border-gray-100">
                                    <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700 text-sm leading-relaxed">
                                        {phase.phaseDescription.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            )}


            {/* Outcomes | Approach side by side */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {desc.outcomes && desc.outcomes.length > 0 && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Outcomes</h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {desc.outcomes.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {desc.approach && desc.approach.length > 0 && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Approach</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                            {desc.approach.map((item, i) => (
                                <p key={i}>{item}</p>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            {/* Current responsibilities: collapsible */}
            {desc.currentResponsibilities && desc.currentResponsibilities.length > 0 && (
                <section>
                    <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
                        <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between [&::-webkit-details-marker]:hidden">
                            <h2 className="text-xl font-semibold text-gray-900">Current Responsibilities</h2>
                            <svg
                                className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <div className="px-5 pb-4 pt-0 border-t border-gray-100">
                            <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                                {desc.currentResponsibilities.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </details>
                </section>
            )}

            {/* All skills at bottom */}
            <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Technologies & skills</h3>
                <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, i) => (
                        <span
                            key={i}
                            className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
