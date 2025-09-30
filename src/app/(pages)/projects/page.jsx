import React from 'react'
import Projects from './components/Projects'

const ProjectsPage = () => {
    return (
        <div className="bg-zinc-50 dark:bg-neutral-900/80 w-full">
            <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">GSSoC'25 Projects</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Explore the projects that you can contribute to in order to earn points and rank higher in the Girls script summer of code 2025 program.
                    </p>
                </div>

                <Projects />
            </div>
        </div>
    )
}

export default ProjectsPage
