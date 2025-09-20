'use client'
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Linkedin, Users, Code, User, Info, ArrowRight, ChartPie } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// List of common tech stacks with their display names and colors
import TECH_STACKS from "./tech_stacks.json";
import { useProjectsStore } from '@/store/projects.store';

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
    const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { isLoading, projects, fetchProject } = useProjectsStore() // for contributors data

    const { additionalProjectInfo, fetchAdditionalProjectInfo } = useProjectsStore() // for additional project info

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


    useEffect(() => {
        if (selectedProject) {
            fetchProject(selectedProject)
        }
    }, [selectedProject])

    useEffect(() => {
        fetchAdditionalProjectInfo(project['Project name'])
    }, [])

    return (
        <>
            <div className={`border rounded-xl overflow-hidden w-full transition-all duration-300 flex flex-col h-full hover:shadow-md ${additionalProjectInfo[project['Project name']]?.rank === null
                ? 'border-amber-200 dark:border-amber-900/50 hover:border-amber-300 dark:hover:border-amber-800/70'
                : 'border-slate-200 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-violet-500/40'
                } ${additionalProjectInfo[project['Project name']]?.rank === null ? 'bg-amber-50/30 dark:bg-amber-950/10' : 'bg-white dark:bg-neutral-900/80'}`}>
                {/* Project Header */}
                <div className='p-6 pb-4'>
                    <div className='flex justify-between items-start mb-3 gap-2'>
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 flex-wrap'>
                                <h3 className='text-xl font-bold text-slate-800 dark:text-white line-clamp-1'>{project['Project name']}</h3>
                                {additionalProjectInfo[project['Project name']]?.rank !== null && additionalProjectInfo[project['Project name']]?.rank !== undefined && (
                                    <span className='text-xs px-2 py-0.5 rounded-full bg-emerald-600 text-white dark:bg-emerald-700/80 font-medium'>
                                        Rank: {additionalProjectInfo[project['Project name']]?.rank}
                                    </span>
                                )}
                            </div>
                            
                            {additionalProjectInfo[project['Project name']]?.rank === null && (
                                <div className='mt-1'>
                                    <span className='text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'>
                                        No Data Found!
                                    </span>
                                </div>
                            )}
                            
                            <div className='mt-2 flex items-center flex-wrap gap-2'>
                                {additionalProjectInfo[project['Project name']]?.lastContribution && (
                                    <span
                                        className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/50"
                                        title={`Last contribution: ${new Date(additionalProjectInfo[project['Project name']].lastContribution).toLocaleDateString()}`}
                                    >
                                        Last contribution:{" "}
                                        {new Date(additionalProjectInfo[project['Project name']].lastContribution).toLocaleDateString()}
                                    </span>
                                )}
                                <div className='flex gap-2'>
                                    {additionalProjectInfo[project['Project name']]?.totalPRs !== null && (
                                        <span className='text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'>
                                            {additionalProjectInfo[project['Project name']]?.totalPRs} PRs
                                        </span>
                                    )}
                                    {additionalProjectInfo[project['Project name']]?.totalUsers !== null && (
                                        <span className='text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'>
                                            {additionalProjectInfo[project['Project name']]?.totalUsers} Contributors
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
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

                <div className='mt-auto flex gap-2 p-4 pt-2 border-t border-slate-200 dark:border-neutral-800'>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className='w-full text-sm font-medium flex items-center justify-center py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-violet-900 dark:hover:bg-violet-800 text-white transition-all duration-200 hover:shadow-md'
                    >
                        View Details <ArrowRight className='h-3.5 w-3.5 ml-1.5' />
                    </button>
                    <button
                        onClick={() => {
                            setIsStatsDialogOpen(true)
                            setSelectedProject(project['Project name'])
                        }}
                        className='w-full text-sm font-medium flex items-center justify-center py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-violet-900 dark:hover:bg-violet-800 text-white transition-all duration-200 hover:shadow-md'
                    >
                        View Leaderboard <ChartPie className='h-3.5 w-3.5 ml-1.5' />
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


            <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-0 bg-white dark:bg-neutral-900/95 backdrop-blur-sm p-0 rounded-xl shadow-xl">
                    <DialogHeader className="border-b border-slate-200 dark:border-neutral-800 p-6">
                        <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white">
                            {project['Project name']} - Project Stats
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-6 space-y-6">
                        {selectedProject && projects[selectedProject] ? (
                            <>
                                <div className="bg-slate-50 dark:bg-neutral-800/30 p-4 rounded-lg">
                                    <h3 className="text-base font-medium text-slate-800 dark:text-white mb-3">
                                        Contributors ({projects[selectedProject]?.totalContributors || 0})
                                    </h3>
                                    <div className="space-y-3">
                                        {projects[selectedProject]?.contributors?.map((contributor, index) => (
                                            <div key={contributor.username} className="flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-lg border border-slate-200 dark:border-neutral-700">
                                                <div className="flex items-center space-x-3">
                                                    <div className="relative">
                                                        <img
                                                            src={contributor.avatarUrl}
                                                            alt={contributor.username}
                                                            className="w-10 h-10 rounded-full border-2 border-emerald-100 dark:border-violet-900"
                                                        />
                                                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 dark:bg-violet-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                            {contributor.rank}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <a
                                                            href={contributor.profileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-medium text-slate-800 dark:text-white hover:text-emerald-600 dark:hover:text-violet-400 transition-colors"
                                                        >
                                                            {contributor.fullName || contributor.username}
                                                        </a>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            @{contributor.username}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-medium text-slate-800 dark:text-white">
                                                        {contributor.totalPrs} PR{contributor.totalPrs !== 1 ? 's' : ''}
                                                    </div>
                                                    <div className="text-xs text-emerald-600 dark:text-violet-400 font-medium">
                                                        {contributor.totalPoints} points
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {projects[selectedProject]?.contributors?.length === 0 && (
                                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                        No contributor data available yet.
                                    </div>
                                )}
                            </>
                        ) : (
                            isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 dark:border-violet-500"></div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    No contributor data available yet.
                                </div>
                            )
                        )}
                    </div>
                </DialogContent>
            </Dialog>


        </>
    );
};

export default ProjectCard;
