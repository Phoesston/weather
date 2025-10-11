import { allProjects } from "./createProject";
import { getSelectedProjectIndex } from "./render";
import { renderTaskList } from "./render";
import { Todo } from "./todo";

export function createTask(){
    const title = document.getElementById('task-title')?.value.trim();
    const desc = document.getElementById('task-desc')?.value.trim();
    const dueDate = document.getElementById('task-due')?.value;
    const priority = document.getElementById('task-priority')?.value;

    if (!title) return;
    
    const selectedIndex = getSelectedProjectIndex();

    if (selectedIndex == null){
        console.log("Select a project first");
        return;
    }

    const newTask = new Todo(title, desc, dueDate, priority);
    allProjects[selectedIndex].addTodo(newTask);

    console.log('New task added:', newTask);
    console.log('Added to project:', allProjects[selectedIndex].name);

    // Clear form inputs
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-due').value = '';
    document.getElementById('task-priority').value = 'normal';

    // Update the task display
    renderTaskList(allProjects[selectedIndex].getTodos());

    

}