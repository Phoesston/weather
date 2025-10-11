import { allProjects } from "./createProject";
import { renderTaskList } from "./render";
import { getSelectedProjectIndex } from "./render";
import { taskForm } from "./taskForm";


export function editTask(taskIndex){
    const selectedIndex = getSelectedProjectIndex();
    if (selectedIndex === null) return;
    
    const task = allProjects[selectedIndex].getTodos()[taskIndex];
    console.log('Editing task:', task);

    const modalWindow= document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    modalWindow.classList.add('active');
    overlay.classList.add('active');

    taskForm();

     // Fill in existing data
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-desc').value = task.description;
    document.getElementById('task-due').value = task.dueDate;
    document.getElementById('task-priority').value = task.priority.toLowerCase();

    modalWindow.dataset.editing = "true";
    modalWindow.dataset.taskIndex = taskIndex;

    
}

export function deleteTask(taskIndex){
    const selectedIndex = getSelectedProjectIndex();
    if (selectedIndex === null) return;
    
    const task = allProjects[selectedIndex].getTodos()[taskIndex];
    
    
    const overlay = document.createElement('div');
    overlay.className = 'delete-overlay';

    overlay.innerHTML = `
        <div class="delete-modal">
            <p>Delete "<strong>${task.title}</strong>"?</p>
            <div class="delete-actions">
                <button class="confirm-delete">Yes</button>
                <button class="cancel-delete">No</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    
    overlay.querySelector('.confirm-delete').addEventListener('click', () => {
        allProjects[selectedIndex].todos.splice(taskIndex, 1);
        renderTaskList(allProjects[selectedIndex].getTodos());
        console.log('Deleted task:', task.title);
        overlay.remove();
    });

   
    overlay.querySelector('.cancel-delete').addEventListener('click', () => {
        overlay.remove();
    });

}

export function toggleComplete(taskIndex) {
    const selectedIndex = getSelectedProjectIndex();
    const checkbox = document.querySelector(`.task-complete-checkbox[data-task-index="${taskIndex}"]`);
    const taskItem = checkbox.closest(".task-item");
    if (selectedIndex === null) return;

    const task = allProjects[selectedIndex].getTodos()[taskIndex];
    task.toggleComplete();
    
    if (task.completed) {
        taskItem.classList.add("task-completed");
    } else {
        taskItem.classList.remove("task-completed");
    }

    console.log("task Completed?",task.getCompleted());
}

export function taskControlListeners(taskContainer) {
    const editButtons = taskContainer.querySelectorAll('.task-edit');
    const deleteButtons = taskContainer.querySelectorAll('.task-delete');
    const completeCheckboxes = taskContainer.querySelectorAll('.task-complete-checkbox');

    
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const taskIndex = parseInt(button.dataset.taskIndex);
            editTask(taskIndex);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const taskIndex = parseInt(button.dataset.taskIndex);
            deleteTask(taskIndex);
        });
    });

    completeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            const taskIndex = parseInt(checkbox.dataset.taskIndex);
            toggleComplete(taskIndex);
        });
    });

}

