# 🚀 Kanban Dashboard

The **Kanban Dashboard** is a professionally developed task-management interface featuring a premium dark-mode design, structured workflow management, and intuitive drag-and-drop interactions. Built with core web technologies, this dashboard demonstrates strong UI/UX principles, modular code structure, and real-world dashboard layout design. It can serve as a standalone project or the foundation for a full project-management tool.

---

## 📘 Overview

This project delivers a complete **Kanban-style task dashboard** that enables users to create, manage, and track tasks across three workflow stages: **To Do**, **Doing**, and **Done**. Every interaction—such as adding tasks, editing content, deleting items, and reorganizing workflow using drag-and-drop—is handled seamlessly through clean, lightweight JavaScript.

Beyond functional task management, the dashboard includes **static sections** like a Projects Timeline and statistic cards to illustrate how productivity tools typically organize information. These elements help visualize the potential for expansion into a larger system.

---

## ✨ Features

### 🌑 Modern Dark Mode Design
- Professional dark theme optimized for readability and aesthetics.
- Fully responsive layout using CSS Grid and Flexbox.
- Clean typography and balanced spacing for a polished dashboard experience.
- Visually consistent and structured UI ideal for demonstrating design principles.

### 🗂️ Advanced Task Management System
- Add new tasks to the workflow with a simple input and toggle button.
- Assign tasks to a stage (To Do → Doing → Done) before insertion.
- Edit existing tasks instantly using the pencil icon.
- Delete tasks instantly through the trash icon.
- All interactions update dynamically without refreshing the page.

### 🎯 Native Drag-and-Drop Functionality
- Task movement powered by the **HTML5 Drag and Drop API**.
- Smooth reordering within or across columns.
- Mimics the interaction style of tools like Jira or Trello.
- No external libraries required, ensuring efficient performance.

### 📊 Static Dashboard Components
- Includes a preset **Projects Timeline** to show milestones or stages.
- Contains static info/statistic cards for future metric expansions.
- Provides a realistic dashboard feel that can be extended into a full application.

---

## 📂 File Sections (Detailed Explanation)

Below is a breakdown of each core file and what sections they contain:

---

### **1. `index.html` — Main Structure File**

This file defines the entire layout of the dashboard. Key sections include:

#### **• Header Section**
- Contains the theme toggle button (sun/moon icon).
- Displays dashboard title or top-level navigation elements.

#### **• Sidebar Section**
- Includes navigation placeholders (e.g., Dashboard, Projects).
- Designed for demonstration and future expansion.

#### **• Main Content Grid**
Divided into two major areas:
1. **Task Management Panel**
   - Input field
   - Add button
   - Column toggle feature
2. **Kanban Columns**
   - **To Do Column**
   - **Doing Column**
   - **Done Column**

Each column contains a task list container where task cards dynamically appear.

#### **• Static Info Sections**
- Projects Timeline block
- Statistic/summary cards  
These sections simulate how additional analytical widgets could be integrated.

---

### **2. `style.css` — Styling and Theme File**

This file contains all the visual styling for the dashboard.

#### **• CSS Variables**
- Theme colors (background, text, accent)
- Shadows, borders, spacing presets

#### **• Global Reset & Typography**
- Universal resets for consistent styling
- Font-family, font-size definitions

#### **• Layout Styling**
- Grid layout for main content
- Flexbox styling for task cards and column structure

#### **• Component Styling**
- Header, sidebar, input fields, buttons
- Kanban task cards (hover effects, spacing, icons)

#### **• Dark Mode Support**
- Theme classes applied when toggled
- Smooth transitions for background and text colors

---

### **3. `script.js` — Logic and Functionality File**

Contains all JavaScript logic, organized into clear sections:

#### **• Element Selection**
- Fetches all DOM elements (input field, buttons, columns)

#### **• Task Creation Logic**
- Function to generate new task cards dynamically
- Inserts tasks into selected column

#### **• Edit & Delete Functionality**
- Inline editing with prompt or text update
- Permanent deletion through DOM removal

#### **• Drag and Drop Handlers**
- `dragstart` → identifies dragged element  
- `dragover` → allows dropping into columns  
- `drop` → moves the task card into the new target column  

#### **• Utility Functions**
- Column cycling logic (To Do → Doing → Done)
- Optional hooks for LocalStorage expansion

---

## 📁 Project Structure

