import ProjectCard from './ProjectCard'
import projectsData from "@/lib/projects.json"

const Projects = () => {
    return (
        <>
            {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </>
    )
}

export default Projects
