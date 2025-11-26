# Kanban Dashboard

A premium, dark-mode Kanban dashboard with a static UI and basic JavaScript functionality.

## Features

- **Premium Dark Mode UI**: A visually appealing dashboard design with a sidebar, header, and grid layout.
- **Task Management**: Add tasks to "To Do", "Doing", or "Done" columns.
- **Drag and Drop**: Move tasks between columns using drag and drop.
- **Hardcoded Dashboard**: Includes a "Projects Timeline" and detailed card statistics (static data).

## Project Structure

- `index.html`: The main dashboard structure (HTML5).
- `style.css`: All styling, including the dark theme and responsive grid.
- `script.js`: Basic JavaScript logic for adding tasks and drag-and-drop functionality.

## Usage

1. Open `index.html` in your browser.
2. Type a task name in the "Add Task" input.
3. Click the "To Do" button to cycle through the target column (To Do -> Doing -> Done).
4. Click the "Add" button (arrow icon) to create the task.
5. Drag tasks between columns to organize them.

- **Move Task**: Drag a task card and drop it into another column.
- **Edit Task**: Click the pencil icon on a task card.
- **Delete Task**: Click the trash icon on a task card.
- **Toggle Theme**: Click the sun/moon icon in the top right corner.

## Technologies Used

- HTML5
- CSS3 (Variables, Flexbox, Grid)
- JavaScript (ES6 Modules)
- LocalStorage API
- Drag and Drop API
