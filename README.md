🚀 Kanban Dashboard
The Kanban Dashboard is a professionally designed task-management interface built with modern web technologies. It delivers a clean, premium dark-mode experience and includes a fully responsive layout, intuitive interactions, and structured task flow management. This project is ideal for demonstrating UI/UX capabilities, JavaScript functionality, and dashboard-style application design.


📘 Overview
This project provides a comprehensive Kanban-style task dashboard that enables users to create, organize, and manage tasks efficiently. It is built with a strong focus on visual consistency, clarity, and usability.
The interface includes three primary workflow columns—To Do, Doing, and Done—allowing users to follow a clear and structured process. The system uses lightweight JavaScript to power all interactions, including task creation, editing, deletion, and drag-and-drop movement across columns.
Additionally, the dashboard includes static data components, such as a project timeline and informational cards, to showcase its potential as part of a larger project management application.


✨ Features
🌑 Modern Dark Mode Design
A premium dark-themed UI designed to provide a sleek, professional appearance.
Responsive layout built with CSS Grid and Flexbox for consistent rendering across screen sizes.
Clean typography and spacing ensure a high-quality dashboard presentation.
🗂️ Task Management System
Create tasks with a simple input interface.
Assign tasks to a workflow column (To Do → Doing → Done) using a toggle button before adding.
Edit tasks using the pencil icon for quick modifications.
Delete tasks instantly using the trash icon.
Tasks update dynamically without refreshing the page.
🎯 Drag and Drop Interaction
Tasks can be moved between workflow stages using smooth drag-and-drop functionality.
Built entirely using the native Drag and Drop API, ensuring lightweight performance and broad browser compatibility.
Enables intuitive workflow organization based on priority or progress.
📊 Static Dashboard Components
The dashboard includes a Projects Timeline with preset events for layout demonstration.
Several information/statistic cards are displayed as placeholders for expanded features in future versions.
These components help visualize how a complete project management dashboard would appear.


📁 Project Structure
/
├── index.html    # Main dashboard layout and structural markup
├── style.css     # All styling: dark theme, layout system, grid, and visual components
└── script.js     # JavaScript logic for task creation, editing, deletion, and drag-and-drop functionality
Each file is organized to maintain clarity and allow easy extension or modification of individual components.


🧩 Usage Instructions
Follow the steps below to use the dashboard effectively:
Open index.html in any modern browser such as Chrome, Edge, or Firefox.
Enter a task name in the input field located at the top of the task panel.
Click the toggle button to select the workflow column for the new task
(To Do → Doing → Done).
Press the Add button to create and insert the task into the selected column.
Drag existing tasks between columns to update their progress as needed.
Additional User Actions
Move Task: Drag the task card and drop it into another column.
Edit Task: Select the pencil icon to update task content.
Delete Task: Use the trash icon to remove the task permanently.
Toggle Theme: Switch between light and dark modes using the sun/moon button.



🛠️ Technologies Used
The project is built entirely with fundamental web technologies:
HTML5 – Semantic structure and user interface layout
CSS3 – Styling with variables, gradients, Grid, and Flexbox
JavaScript (ES6) – Task handling and dynamic interactions
LocalStorage API – Intended use for saving tasks (expandable feature)
Drag and Drop API – Enables intuitive task movement
