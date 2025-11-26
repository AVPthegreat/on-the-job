/*
import { Storage } from './storage.js';

// DOM Elements
const columns = document.querySelectorAll('.task-list');
const addBtns = document.querySelectorAll('.add-task-btn');
const modalOverlay = document.getElementById('task-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const taskForm = document.getElementById('task-form');
const themeToggle = document.getElementById('theme-toggle');

// State
let currentDragItem = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupTheme();
    setupEventListeners();
});

function setupEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Modal Controls
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(null, btn.dataset.column));
    });
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Form Submit
    taskForm.addEventListener('submit', handleFormSubmit);

    // Drag and Drop Events for Columns
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('dragleave', handleDragLeave);
        column.addEventListener('drop', handleDrop);
    });
}

// --- Theme Handling ---
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// --- Task Management ---
function loadTasks() {
    const tasks = Storage.getTasks();
    
    // Clear existing
    document.getElementById('todo-list').innerHTML = '';
    document.getElementById('progress-list').innerHTML = '';
    document.getElementById('done-list').innerHTML = '';

    tasks.forEach(task => renderTask(task));
    updateCounts();
}

function renderTask(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.id = task.id;
    card.dataset.status = task.status;
    
    card.innerHTML = `
        <div class="task-content">${escapeHtml(task.content)}</div>
        <div class="task-meta">
            <button class="task-action-btn btn-edit" aria-label="Edit">✎</button>
            <button class="task-action-btn btn-delete" aria-label="Delete">🗑</button>
        </div>
    `;

    // Drag Events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    // Button Events
    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = card.querySelector('.btn-delete');

    editBtn.addEventListener('click', () => openModal(task));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    // Append to correct column
    const columnId = getColumnIdFromStatus(task.status);
    document.getElementById(columnId).appendChild(card);
}

function getColumnIdFromStatus(status) {
    switch(status) {
        case 'todo': return 'todo-list';
        case 'in-progress': return 'progress-list';
        case 'done': return 'done-list';
        default: return 'todo-list';
    }
}

function updateCounts() {
    document.getElementById('todo-count').innerText = document.getElementById('todo-list').children.length;
    document.getElementById('progress-count').innerText = document.getElementById('progress-list').children.length;
    document.getElementById('done-count').innerText = document.getElementById('done-list').children.length;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// --- Modal & Form ---
function openModal(task = null, status = 'todo') {
    const modalTitle = document.getElementById('modal-title');
    const contentInput = document.getElementById('task-content');
    const idInput = document.getElementById('task-id');
    const statusInput = document.getElementById('task-status');

    if (task) {
        modalTitle.textContent = 'Edit Task';
        contentInput.value = task.content;
        idInput.value = task.id;
        statusInput.value = task.status;
    } else {
        modalTitle.textContent = 'New Task';
        contentInput.value = '';
        idInput.value = '';
        statusInput.value = status;
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    // Small delay to ensure transition starts/element is visible before focus
    setTimeout(() => {
        contentInput.focus();
    }, 50);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
}

function handleFormSubmit(e) {
    e.preventDefault();
    const content = document.getElementById('task-content').value;
    const id = document.getElementById('task-id').value;
    const status = document.getElementById('task-status').value;

    if (id) {
        // Update
        const updatedTask = { id, content, status };
        Storage.updateTask(updatedTask);
        // Re-render all to be safe and simple
        loadTasks();
    } else {
        // Create
        const newTask = {
            id: Date.now().toString(),
            content,
            status
        };
        Storage.addTask(newTask);
        renderTask(newTask);
        updateCounts();
    }

    closeModal();
}

function deleteTask(id) {
    if(confirm('Are you sure you want to delete this task?')) {
        Storage.deleteTask(id);
        const card = document.getElementById(id);
        if (card) {
            card.remove();
            updateCounts();
        }
    }
}

// --- Drag and Drop Logic ---
function handleDragStart(e) {
    currentDragItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.id);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    columns.forEach(col => col.classList.remove('drag-over'));
    currentDragItem = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const taskId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(taskId);
    
    // Determine new status based on column parent ID
    // The listener is on .task-list, its parent is .column which has data-status
    const newStatus = this.parentElement.dataset.status;

    if (card && newStatus) {
        this.appendChild(card);
        Storage.updateTaskStatus(taskId, newStatus);
        card.dataset.status = newStatus;
        updateCounts();
    }
}
*/
