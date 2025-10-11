import { modal} from "./modal";
import "../styles/styles.css";
import { initFilters } from "./filters";

//const myProject = new Project('My Tasks');
//const todo1 = new Todo('Study', 'JavaScript class syntax', '2025-07-15', 'High');
//const todo2 = new Todo('Workout', 'Leg day at the gym', '2025-07-16', 'Medium');

//myProject.addTodo(todo1);
//myProject.addTodo(todo2);

//console.log('\n📋 All Todos in Project:');
//myProject.getTodos().forEach((todo, index) => {
//  console.log(`${index + 1}. ${todo.title} | Due: ${todo.dueDate} | Completed: ${todo.completed}`);
//});

// 5. Toggle completion on a task
//console.log('\n✅ Toggling completion on first task...');
//todo1.toggleComplete();

// 6. Confirm updated state
//console.log('\n📋 Updated Todos:');
//myProject.getTodos().forEach((todo, index) => {
//  console.log(`${index + 1}. ${todo.title} | Completed: ${todo.completed}`);
//});


document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  modal();
});