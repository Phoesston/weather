import { allProjects } from "./createProject";
import { renderTaskList, toggleAddTaskButton } from "./render";

export function initFilters(){

    const buttons = {
        "all-task": document.getElementById("all-task"),
        "today": document.getElementById("today"),
        "upcoming": document.getElementById("upcoming"),
        "completed": document.getElementById("completed")
    }

    Object.entries(buttons).forEach(([key, btn]) => {
        if (!btn) return;

        btn.addEventListener('click', () => {
            let todosToRender = [];

            switch (key) {
                case "all-task":
                    todosToRender = allProjects.flatMap(project => project.getTodos());
                    break;

                case "today": {
                    const today = new Date().toISOString().split("T")[0];
                    todosToRender = allProjects
                        .flatMap(project => project.getTodos())
                        .filter(todo => todo.dueDate === today);
                    break;
                }

                case "upcoming": {
                    const today = new Date();
                    todosToRender = allProjects
                        .flatMap(project => project.getTodos())
                        .filter(todo => todo.dueDate && new Date(todo.dueDate) > today);
                    break;
                }

                case "completed":
                    todosToRender = allProjects
                        .flatMap(project => project.getTodos())
                        .filter(todo => todo.completed);
                    break;
            }

            renderTaskList(todosToRender);
            toggleAddTaskButton(false);
        });
    });

}

