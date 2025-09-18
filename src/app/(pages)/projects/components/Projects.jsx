import ProjectCard from './ProjectCard'
import projectsData from "@/lib/Projects.json"

console.log(projectsData)

const Projects = () => {
    return (
        <div className='grid grid-cols-3 gap-4'>
            {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}

export default Projects
