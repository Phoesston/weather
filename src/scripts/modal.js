import { createProject } from "./createProject";
import { projectForm } from "./projectForm";
import { getSelectedProjectIndex } from "./render";
import { allProjects} from "./createProject";
import { renderTaskList } from "./render";

import { taskForm } from "./taskForm";
import { createTask } from "./createTask";


let currentModalType = null;

export function modal(){
    const addProjectButton = document.getElementById('add-project');
    const addTaskButton = document.getElementById('add-task');

    const submitButton = document.getElementById("submit-button");
    const cancelButton = document.getElementById("cancel-button");

    const modalWindow = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    addProjectButton.addEventListener("click", () => {
        modalWindow.classList.add('active');
        overlay.classList.add('active');
        projectForm();
        
        currentModalType = 'project'
        
    });

    addTaskButton.addEventListener("click", () =>{
        modalWindow.classList.add('active');
        overlay.classList.add('active');
        taskForm();

        currentModalType = 'task';
        
    });

    submitButton.addEventListener("click", () => {
        if (currentModalType == 'project') {
            createProject();
        } 
        else if (currentModalType == 'task') {
            if (modalWindow.dataset.editing === "true") {
                // Edit mode
                const selectedIndex = getSelectedProjectIndex();
                const taskIndex = parseInt(modalWindow.dataset.taskIndex);
                const task = allProjects[selectedIndex].getTodos()[taskIndex];

                task.title = document.getElementById('task-title').value.trim();
                task.description = document.getElementById('task-desc').value.trim();
                task.dueDate = document.getElementById('task-due').value;
                task.priority = document.getElementById('task-priority').value;

                renderTaskList(allProjects[selectedIndex].getTodos());
                console.log('Task updated:', task);
            } else {
                // Add mode
                createTask();
            }
        }

        modalWindow.classList.remove('active');
        overlay.classList.remove('active');
        modalWindow.dataset.editing = "";
        modalWindow.dataset.taskIndex = "";
    });

  

    cancelButton.addEventListener("click", () => {
        modalWindow.classList.remove('active');
        overlay.classList.remove('active');
    });
}