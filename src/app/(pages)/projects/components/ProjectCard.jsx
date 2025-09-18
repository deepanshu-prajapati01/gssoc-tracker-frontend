import React from 'react';
import { ExternalLink, Github, Linkedin, Users, Code, User } from 'lucide-react';

const ProjectCard = ({
    project = {
        'Project name': 'Project Name',
        'Project description': 'A brief description of the project goes here. This should give an overview of what the project is about and its main purpose.',
        'Project link': '#',
        'Project admin': 'Admin Name',
        'Admin linkedin': '#',
        'Admin github': '#',
        'Tech stack': 'React, Node.js, MongoDB',
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
                <p className='mt-2 text-slate-600 dark:text-slate-300 text-sm line-clamp-3'>
                    {project['Project description']}
                </p>
            </div>

            {/* Tech Stack */}
            <div className='p-6 py-4 border-b border-slate-200 dark:border-neutral-800'>
                <div className='flex items-center text-sm text-slate-600 dark:text-slate-300'>
                    <Code className='h-4 w-4 mr-2 text-emerald-600 dark:text-violet-500' />
                    <span className='font-medium'>Tech Stack:</span>
                    <span className='ml-2 text-slate-800 dark:text-slate-200'>{project['Tech stack']}</span>
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
    );
};

export default ProjectCard;
