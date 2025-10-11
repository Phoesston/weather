import { allProjects} from "./createProject";
import { taskControlListeners } from "./taskControls";

import trashIcon from '../assets/images/trash.svg';
import editIcon from '../assets/images/edit.svg';

let selectedIndex = null;

export function getSelectedProjectIndex(){
    return selectedIndex;
}

export function toggleAddTaskButton(show) {
    const addTaskButton = document.getElementById("add-task");
    if (!addTaskButton) return;

    addTaskButton.style.display = show ? "inline-block" : "none";
}

function handleProjectSelection(index, element) {
    const allItems = document.querySelectorAll('.project-item');
    const taskControls = document.getElementById('task-button-div');

    if (selectedIndex === index) {
        // Deselect if same project is clicked again
        element.classList.remove('selected');
        selectedIndex = null;
        console.log('Project deselected');

        taskControls.classList.remove('active');

        toggleAddTaskButton(false); 
    } else {
        // Deselect all first
        allItems.forEach(item => item.classList.remove('selected'));

        // Select new one
        element.classList.add('selected');
        selectedIndex = index;
        console.log('Selected project: ', allProjects[index]);

        taskControls.classList.add('active');

        renderTaskList(allProjects[selectedIndex].getTodos());

        toggleAddTaskButton(true); 
    }
}

export function renderProjectList(){
    const list = document.getElementById('project-list');
    list.innerHTML = '';

    allProjects.forEach((proj, i) => {
        const item = document.createElement('div');
        item.textContent = proj.name;
        item.classList.add('project-item');

        item.addEventListener('click',() => {
            handleProjectSelection(i, item);
        });

        list.appendChild(item);
    });
}

// Temporary dummy data for style testing
/*const todos = [
    {
        title: "Test Task 1",
        description: "This is a sample description to test the layout and styles.",
        dueDate: "2025-08-15",
        priority: "High"
    },
    {
        title: "Test Task 2",
        description: "Another example with different text length to check wrapping.",
        dueDate: "",
        priority: "Medium"
    },
    {
        title: "Test Task 3",
        description: "",
        dueDate: "2025-08-20",
        priority: "Low"
    },
    {
        title: "Test Task 4",
        description: "Another example with different text length to check wrapping.",
        dueDate: "",
        priority: "Medium"
    },
    {
        title: "Test Task 5",
        description: "",
        dueDate: "2025-08-20",
        priority: "Low"
    },
    {
        title: "Test Task 6",
        description: "Another example with different text length to check wrapping.",
        dueDate: "",
        priority: "Medium"
    },
    {
        title: "Test Task 7",
        description: "Another example with different text length to check wrapping.",
        dueDate: "",
        priority: "Medium"
    }
];*/


export function renderTaskList(todos){
    const taskContainer = document.getElementById("task-list");
    taskContainer.innerHTML =``;

    if(!todos || todos.length == 0){
        taskContainer.innerHTML = `<p>No tasks yet. Add a task to get started!</p>`;

        return; 
    }

    todos.forEach((todo, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item");

        taskDiv.innerHTML = `
            <div class="task-item-header">

                <div class="task-item-header-title">
                    <input type="checkbox" class="task-complete-checkbox"   data-task-index="${index}" ${todo.completed ? 'checked' : ''} />
                    <h3>${todo.title}</h3>
                </div>
    
                <div class="task-item-header-buttons">
                    <button class="task-edit" data-task-index="${index}"><img src="${editIcon}" alt="delete"></button>
                    <button class="task-delete" data-task-index="${index}"><img src="${trashIcon}" alt="delete"></button>
                </div>
            </div>

            <div class="task-item-content">
                <p>${todo.description || ""}</p>
                <p>Due: ${todo.dueDate || "No date"}</p>
                <p>Priority: ${todo.priority}</p>
            </div>
            
        `;

        taskContainer.appendChild(taskDiv);
    });

    taskControlListeners(taskContainer);
}

//For testing styles
//renderTaskList(todos);