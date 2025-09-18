'use client'
import React, { useState } from 'react';
import { ExternalLink, Github, Linkedin, Users, Code, User, Info } from 'lucide-react';
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

    // Function to parse and match tech stacks
    const parseTechStack = (stackString) => {
        if (!stackString) return [];

        const stackItems = stackString.split(',').map(item => item.trim().toLowerCase());
        const matchedStacks = [];

        TECH_STACKS.forEach(tech => {
            if (stackItems.some(item => item.includes(tech.id.toLowerCase()))) {
                matchedStacks.push(tech);
            }
        });

        // If no matches found, return badge that says "Other"
        if (matchedStacks.length === 0) {
            // return stackItems.map(item => ({
            //     id: item.toLowerCase().replace(/[^a-z0-9]/g, ''),
            //     name: item,
            //     color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            // }));
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
            <div className='border border-slate-200 dark:border-neutral-800 rounded-xl overflow-hidden w-full bg-white dark:bg-neutral-900 hover:shadow-lg transition-shadow duration-300'>
                {/* Project Header */}
                <div className='p-6 pb-4 border-b border-slate-200 dark:border-neutral-800'>
                    <div className='flex justify-between items-start'>
                        <h3 className='text-xl font-bold text-slate-900 dark:text-white'>{project['Project name']}</h3>
                        <a
                            href={project['Project link']}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-400 hover:text-emerald-600 dark:hover:text-violet-500 transition-colors'
                            title='View Project'
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                    <p className='min-h-20 mt-2 text-slate-600 dark:text-slate-300 text-sm line-clamp-4'>
                        {project['Project description']}
                    </p>

                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className='text-xs flex items-center text-emerald-600 dark:text-violet-500 hover:underline px-2 py-1 rounded-md border border-emerald-300 dark:border-violet-400/40 hover:bg-emerald-50 dark:hover:bg-violet-500/10 hover:text-emerald-600 dark:hover:text-violet-500'
                    >
                        <Info className='h-3 w-3 mr-1' /> View Details
                    </button>


                </div>

                {/* Tech Stack */}
                <div className='p-6 py-4 border-b border-slate-200 dark:border-neutral-800'>
                    <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center text-sm text-slate-600 dark:text-slate-300'>
                            <Code className='h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500' />
                            <span className='font-medium'>Tech Stack</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {techStacks.map((tech, index) => (
                            <span
                                key={index}
                                className={`text-xs px-2 py-1 rounded-full ${tech.color}`}
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Project Admin */}
                <div className='p-6 py-4 border-b border-slate-200 dark:border-neutral-800'>
                    <h4 className='text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 flex items-center'>
                        <User className='h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500' />
                        Project Admin
                    </h4>
                    <div className='flex items-center justify-between'>
                        <span className='text-slate-800 dark:text-white font-medium'>{project['Project admin']}</span>
                        <div className='flex space-x-3'>
                            <a
                                href={project['Admin github']}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-slate-400 hover:text-emerald-600 dark:hover:text-violet-500 transition-colors'
                                title='GitHub Profile'
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href={project['Admin linkedin']}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-slate-400 hover:text-emerald-600 dark:hover:text-violet-500 transition-colors'
                                title='LinkedIn Profile'
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mentors */}
                {mentors.length > 0 && (
                    <div className='p-6 py-4'>
                        <h4 className='text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 flex items-center'>
                            <Users className='h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500' />
                            Mentors
                        </h4>
                        <div className='space-y-3'>
                            {mentors.map((mentor, index) => (
                                <div key={index} className='flex items-center justify-between'>
                                    <span className='text-slate-800 dark:text-white'>{mentor.name}</span>
                                    <div className='flex space-x-3'>
                                        <a
                                            href={mentor.github}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-slate-400 hover:text-emerald-600 dark:hover:text-violet-500 transition-colors'
                                            title={`${mentor.name}'s GitHub`}
                                        >
                                            <Github size={16} />
                                        </a>
                                        <a
                                            href={mentor.linkedin}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-slate-400 hover:text-emerald-600 dark:hover:text-violet-500 transition-colors'
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

            {/* Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                            {project['Project name']}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Description</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                {project['Project description']}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Tech Stack</h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                {project['Tech stack']}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Project Admin</h3>
                            <div className="flex items-center justify-between bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg">
                                <span className="text-slate-800 dark:text-white font-medium">{project['Project admin']}</span>
                                <div className="flex space-x-3">
                                    <a
                                        href={project['Admin github']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-emerald-600 dark:hover:text-violet-500 transition-colors"
                                        title="GitHub Profile"
                                    >
                                        <Github size={18} />
                                    </a>
                                    <a
                                        href={project['Admin linkedin']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-emerald-600 dark:hover:text-violet-500 transition-colors"
                                        title="LinkedIn Profile"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <a
                                href={project['Project link']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white rounded-md transition-colors"
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Project
                            </a>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectCard;
