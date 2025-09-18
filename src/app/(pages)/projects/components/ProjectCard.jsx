'use client'
import React, { useState } from 'react';
import { ExternalLink, Github, Linkedin, Users, Code, User, Info, ArrowRight } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// List of common tech stacks with their display names and colors
import TECH_STACKS from "./tech_stacks.json";

const ProjectCard = ({
    project = {
        'Project name': 'Project Name',
        'Project description': 'A brief description of the project goes here. This should give an overview of what the project is about and its main purpose. This is a longer description that will be shown in the dialog when the user clicks the View Details button.',
        'Project link': '#',
        'Project admin': 'Admin Name',
        'Admin linkedin': '#',
        'Admin github': '#',
        'Tech stack': 'React, Node.js, MongoDB, Express, TypeScript',
        'mentor 1': 'Mentor 1',
        'mentor 1 github': '#',
        'mentor 1 linkedin': '#',
        'mentor 2': 'Mentor 2',
        'Mentor 2 linkedin': '#',
        'mentor 2 github': '#',
        'mentor 3': '',
        'mentor 3 linkedin': '',
        'mentor 3 github': '',
        'mentor 4': '',
        'mentor 4 linkedin': '',
        'mentor 4 github': '',
        'mentor 5': '',
        'mentor 5 linkedin': '',
        'mentor 5 github': ''
    }
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Function to parse and match tech stacks with exact matching
    const parseTechStack = (stackString) => {
        if (!stackString) return [];

        const stackItems = stackString.split(',').map(item => item.trim().toLowerCase());
        const matchedStacks = [];
        const matchedIds = new Set();

        // First pass: Try exact matches
        stackItems.forEach(item => {
            const exactMatch = TECH_STACKS.find(tech => 
                tech.id.toLowerCase() === item || 
                tech.aliases?.some(alias => alias.toLowerCase() === item)
            );
            
            if (exactMatch && !matchedIds.has(exactMatch.id)) {
                matchedStacks.push(exactMatch);
                matchedIds.add(exactMatch.id);
            }
        });

        // If no exact matches found, check for partial matches as fallback
        if (matchedStacks.length === 0) {
            stackItems.forEach(item => {
                const partialMatch = TECH_STACKS.find(tech => 
                    item.includes(tech.id.toLowerCase()) && 
                    !matchedIds.has(tech.id)
                );
                
                if (partialMatch) {
                    matchedStacks.push(partialMatch);
                    matchedIds.add(partialMatch.id);
                }
            });
        }

        // If still no matches found, return the "other" badge
        if (matchedStacks.length === 0) {
            return [{
                id: 'other',
                name: 'Please check details in order to get the tech stack',
                color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }];
        }

        return matchedStacks;
    };

    const techStacks = parseTechStack(project['Tech stack']);
    // Extract mentors data
    const mentors = [];
    for (let i = 1; i <= 5; i++) {
        const mentor = project[`mentor ${i}`];
        if (mentor) {
            mentors.push({
                name: mentor,
                github: project[`mentor ${i} github`],
                linkedin: project[`mentor ${i} linkedin`] || project[`Mentor ${i} linkedin`] || '#'
            });
        }
    }

    return (
        <>
            <div className='border border-slate-200 dark:border-neutral-800 rounded-xl overflow-hidden w-full bg-white dark:bg-neutral-900/80 transition-all duration-300 flex flex-col h-full hover:shadow-md hover:border-emerald-200 dark:hover:border-violet-500/40'>
                {/* Project Header */}
                <div className='p-6 pb-4'>
                    <div className='flex justify-between items-start mb-3'>
                        <h3 className='text-xl font-bold text-slate-800 dark:text-white line-clamp-1'>{project['Project name']}</h3>
                        <a
                            href={project['Project link']}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex-shrink-0 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-violet-500 transition-colors p-1.5 -mr-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-full'
                            title='View Project'
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>

                    <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4'>
                        {project['Project description']}
                    </p>

                    <div className='mt-4'>
                        <div className='mb-3'>
                            <div className='flex items-center text-xs font-medium text-emerald-700 dark:text-violet-400 mb-2'>
                                <Code className='h-3.5 w-3.5 mr-1.5' />
                                <span>Tech Stack</span>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {techStacks.slice(0, 3).map((tech, index) => (
                                    <span
                                        key={index}
                                        className='text-xs px-2.5 py-1 rounded-full border border-emerald-100 dark:border-violet-500/20 bg-emerald-50/50 dark:bg-violet-500/10 text-emerald-700 dark:text-violet-400 transition-colors hover:bg-emerald-100/70 dark:hover:bg-violet-500/20'
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                                {techStacks.length > 3 && (
                                    <span className='text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-slate-300 border border-slate-200 dark:border-neutral-700 transition-colors'>
                                        +{techStacks.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-auto p-4 pt-2 border-t border-slate-200 dark:border-neutral-800'>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className='w-full text-sm font-medium flex items-center justify-center py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white transition-all duration-200 hover:shadow-md'
                    >
                        View Details <ArrowRight className='h-3.5 w-3.5 ml-1.5' />
                    </button>
                </div>
            </div>

            {/* Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border-0 bg-white dark:bg-neutral-900/95 backdrop-blur-sm p-0 rounded-xl shadow-xl">
                    <DialogHeader className="border-b border-slate-200 dark:border-neutral-800 p-6">
                        <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white">
                            {project['Project name']}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 p-6 pt-0">
                        <div className="bg-slate-50 dark:bg-neutral-800/30 p-4 rounded-lg">
                            <h3 className="text-base font-medium text-slate-800 dark:text-white mb-2 flex items-center">
                                <Info className="h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500" />
                                Description
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                {project['Project description']}
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-neutral-800/30 p-4 rounded-lg">
                            <h3 className="text-base font-medium text-slate-800 dark:text-white mb-2 flex items-center">
                                <Code className="h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500" />
                                Tech Stack
                            </h3>
                            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                {project['Tech stack']}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base font-medium text-slate-800 dark:text-white mb-2">Project Admin</h3>
                                <div className="flex items-center justify-between bg-slate-50 dark:bg-neutral-800/30 p-4 rounded-lg border border-slate-100 dark:border-neutral-800">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500" />
                                        <span className="text-slate-800 dark:text-white font-medium">{project['Project admin']}</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <a
                                            href={project['Admin github']}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-violet-500 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-full"
                                            title="GitHub Profile"
                                        >
                                            <Github size={16} />
                                        </a>
                                        <a
                                            href={project['Admin linkedin']}
                                            target="_blank"
                                            rel="opener noreferrer"
                                            className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-violet-500 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-full"
                                            title="LinkedIn Profile"
                                        >
                                            <Linkedin size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {mentors.length > 0 && (
                                <div>
                                    <h3 className="text-base font-medium text-slate-800 dark:text-white mb-2">Mentors</h3>
                                    <div className="space-y-3">
                                        {mentors.map((mentor, index) => (
                                            <div key={index} className="flex items-center justify-between bg-slate-50 dark:bg-neutral-800/30 p-4 rounded-lg border border-slate-100 dark:border-neutral-800">
                                                <div className="flex items-center">
                                                    <Users className="h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500" />
                                                    <span className="text-slate-800 dark:text-white">{mentor.name}</span>
                                                </div>
                                                <div className="flex space-x-3">
                                                    <a
                                                        href={mentor.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-violet-500 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-full"
                                                        title={`${mentor.name}'s GitHub`}
                                                    >
                                                        <Github size={16} />
                                                    </a>
                                                    <a
                                                        href={mentor.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-violet-500 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-full"
                                                        title={`${mentor.name}'s LinkedIn`}
                                                    >
                                                        <Linkedin size={16} />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-neutral-800 mt-6">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <a
                                href={project['Project link']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                            >
                                Visit Project
                                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                            </a>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectCard;
