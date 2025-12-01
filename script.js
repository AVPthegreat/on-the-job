// State
let tasks = [
    { id: 't1', title: 'Design System', column: 'todo', priority: 'high', dueDate: new Date(Date.now() + 86400000).toISOString() },
    { id: 't2', title: 'API Integration', column: 'doing', priority: 'medium', dueDate: new Date(Date.now() + 172800000).toISOString() },
    { id: 't3', title: 'User Testing', column: 'done', priority: 'low', dueDate: new Date(Date.now() - 86400000).toISOString() }
];

// DOM Elements
const txt = document.getElementById('txt');
const addBtn = document.getElementById('add');
const colBtn = document.getElementById('col-btn');
const colText = document.getElementById('col-text');
const priorityBtn = document.getElementById('priority-btn');
const priorityText = document.getElementById('priority-text');
const dateInput = document.getElementById('date-input');

// Constants
const columns = ['todo', 'doing', 'done'];
const columnLabels = {'todo': 'To Do', 'doing': 'Doing', 'done': 'Done'};
const priorities = ['low', 'medium', 'high'];
const priorityLabels = {'low': 'Priority: Low', 'medium': 'Priority: Medium', 'high': 'Priority: High'};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
    dateInput.value = tomorrow.toISOString().slice(0, 16);

    loadTasks(); // Load from LocalStorage
    renderTasks();
    renderTimeline();
});

// --- Event Listeners ---

// Column Selector
colBtn.onclick = () => {
    const currentVal = colBtn.dataset.value;
    const nextIndex = (columns.indexOf(currentVal) + 1) % columns.length;
    const newVal = columns[nextIndex];
    colBtn.dataset.value = newVal;
    colText.textContent = columnLabels[newVal];
};

// Priority Selector
priorityBtn.onclick = () => {
    const currentVal = priorityBtn.dataset.value;
    const nextIndex = (priorities.indexOf(currentVal) + 1) % priorities.length;
    const newVal = priorities[nextIndex];
    priorityBtn.dataset.value = newVal;
    priorityText.textContent = priorityLabels[newVal];
};

// Add Task (Click)
addBtn.onclick = addTask;

// Add Task (Enter)
txt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// --- Persistence ---

function saveTasks() {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem('kanban_tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

// --- Core Logic ---

function addTask() {
    const title = txt.value.trim();
    if (!title) return;

    const newTask = {
        id: 'c_' + Math.random().toString(36).slice(2, 9),
        title: title,
        column: colBtn.dataset.value,
        priority: priorityBtn.dataset.value,
        dueDate: dateInput.value || new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(); // Save
    renderTasks();
    renderTimeline();
    txt.value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(); // Save
    renderTasks();
    renderTimeline();
}

function renderTasks() {
    // Clear columns
    document.getElementById('todo').innerHTML = '';
    document.getElementById('doing').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    tasks.forEach(task => {
        const card = createCardElement(task);
        const container = document.getElementById(task.column);
        if (container) container.appendChild(card);
    });
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newTitle = prompt('Edit task title:', task.title);
    if (!newTitle) return;
    
    task.title = newTitle.trim();
    saveTasks(); // Save changes
    renderTasks();
    renderTimeline();
}

function createCardElement(task) {
    const el = document.createElement('div');
    el.className = `dashboard-task-card priority-${task.priority}`;
    el.draggable = true;
    el.id = task.id;
    
    // Drag Events
    el.ondragstart = ev => {
        ev.dataTransfer.setData('text/plain', task.id);
        ev.dataTransfer.effectAllowed = 'move';
    };

    // Content
    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.justifyContent = 'space-between';
    content.style.alignItems = 'center';

    const text = document.createElement('span');
    text.textContent = task.title;
    text.style.color = '#fff';
    text.style.fontWeight = '500';

    const meta = document.createElement('div');
    meta.style.display = 'flex';
    meta.style.alignItems = 'center';
    meta.style.gap = '8px';

    // Due Date Badge
    const date = new Date(task.dueDate);
    const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const dateBadge = document.createElement('span');
    dateBadge.textContent = dateStr;
    dateBadge.style.fontSize = '0.7rem';
    dateBadge.style.color = '#888';
    dateBadge.style.backgroundColor = '#222';
    dateBadge.style.padding = '2px 6px';
    dateBadge.style.borderRadius = '4px';

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✎';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        editTask(task.id);
    };
    editBtn.style.background = 'none';
    editBtn.style.border = 'none';
    editBtn.style.color = '#666';
    editBtn.style.fontSize = '1.2rem';
    editBtn.style.cursor = 'pointer';
    editBtn.onmouseover = () => editBtn.style.color = '#fff';
    editBtn.onmouseout = () => editBtn.style.color = '#666';

    // Delete Button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '&times;';
    delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteTask(task.id);
    };
    delBtn.style.background = 'none';
    delBtn.style.border = 'none';
    delBtn.style.color = '#666';
    delBtn.style.fontSize = '1.2rem';
    delBtn.style.cursor = 'pointer';
    delBtn.onmouseover = () => delBtn.style.color = '#ef4444';
    delBtn.onmouseout = () => delBtn.style.color = '#666';

    meta.appendChild(dateBadge);
    meta.appendChild(editBtn);
    meta.appendChild(delBtn);

    content.appendChild(text);
    content.appendChild(meta);
    el.appendChild(content);

    return el;
}

// --- Drag & Drop Global Handlers ---
window.drop = function(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData('text/plain');
    const task = tasks.find(t => t.id === id);
    
    // Identify target column
    let target = ev.target;
    while (target && !target.classList.contains('task-container')) {
        target = target.parentElement;
    }

    if (task && target) {
        task.column = target.id;
        saveTasks(); // Save
        renderTasks();
        renderTimeline(); // Update timeline colors if status changed
    }
};

// --- Timeline Logic ---

function renderTimeline() {
    const chart = document.getElementById('timeline-chart');
    const xAxis = document.getElementById('timeline-x-axis');
    if (!chart || !xAxis) return;

    chart.innerHTML = '';
    xAxis.innerHTML = '';

    // 1. Setup Y-Axis (Next 7 Days)
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d);
    }

    const yAxis = document.createElement('div');
    yAxis.className = 'y-axis';
    dates.forEach(d => {
        const span = document.createElement('span');
        span.textContent = d.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' });
        yAxis.appendChild(span);
    });
    chart.appendChild(yAxis);

    // 2. Setup Grid & Capsules
    const grid = document.createElement('div');
    grid.className = 'timeline-grid';
    
    // Grid Lines
    dates.forEach(() => {
        const line = document.createElement('div');
        line.className = 'grid-line';
        grid.appendChild(line);
    });

    // Plot Tasks
    tasks.forEach(task => {
        if (task.column === 'done') return; // Optional: Hide done tasks from timeline

        const dueDate = new Date(task.dueDate);
        
        // Find which row (date) this task belongs to
        const rowIndex = dates.findIndex(d => 
            d.getDate() === dueDate.getDate() && 
            d.getMonth() === dueDate.getMonth()
        );

        if (rowIndex !== -1) {
            // Calculate X position based on time (0-24h)
            const hours = dueDate.getHours() + (dueDate.getMinutes() / 60);
            const leftPercent = (hours / 24) * 100;
            
            // Calculate Top position based on row index
            // Assuming 7 rows, each is ~14.28% height
            const rowHeight = 100 / 7;
            const topPercent = (rowIndex * rowHeight) + (rowHeight / 2) - 2; // Center in row

            const capsule = document.createElement('div');
            capsule.className = `capsule ${getTaskColor(task)}`;
            capsule.style.left = `${leftPercent}%`;
            capsule.style.top = `${topPercent}%`;
            capsule.style.width = '200px'; // Fixed width for readability

            // Remaining Time Calculation
            const diffMs = dueDate - new Date();
            const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
            const timeText = diffHrs > 0 ? `${diffHrs}h left` : 'Overdue';

            capsule.innerHTML = `
                <span style="margin-right:4px">${task.title}</span>
                <span style="font-size:0.7em; opacity:0.8">${timeText}</span>
            `;

            grid.appendChild(capsule);
        }
    });

    chart.appendChild(grid);

    // 3. Setup X-Axis (Time)
    ['00:00', '06:00', '12:00', '18:00', '23:59'].forEach(time => {
        const span = document.createElement('span');
        span.textContent = time;
        xAxis.appendChild(span);
    });
}

function getTaskColor(task) {
    if (task.column === 'todo') return 'orange';
    if (task.column === 'doing') return 'green';
    return 'white';
}
