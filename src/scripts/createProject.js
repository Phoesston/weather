import { Project } from "./project";
import { renderProjectList } from "./render";

export const allProjects = [];

export function createProject(){
    
    const name = document.getElementById('project-name-input')?.value.trim();

    if(!name) return;

    const newProject = new Project(name);
    allProjects.push(newProject);

    renderProjectList();
    console.log('new project added: ',newProject);

}