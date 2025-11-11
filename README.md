# Todo App 📝

A modern and responsive Todo application built with React and Material-UI that allows users to manage their tasks with time functionality.

## ✨ Features

- **📱 Responsive design** - Works perfectly on desktop, tablet and mobile
- **⏰ Time scheduling** - Add start and end times for each task
- **🎯 Filtering** - View all, completed or uncompleted tasks
- **✅ Mark as completed** - Easy toggle of task status
- **✏️ Edit tasks** - Update title, details and times
- **🗑️ Delete tasks** - Remove tasks you no longer need
- **💾 Local storage** - Your tasks are automatically saved in the browser
- **🎨 Modern UI** - Elegant design with black borders and gradient backgrounds
- **🔔 Toast notifications** - Feedback for user actions

## 🛠️ Technologies

- **React 18.2.0** - Frontend framework
- **Material-UI 5.12.1** - UI component library
- **MUI X Date Pickers 6.19.9** - Time and date pickers
- **Day.js** - Date and time handling
- **UUID** - Unique ID generation for tasks
- **CSS3** - Custom styling and responsive design

## 📦 Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/Msjunior10/Todoapp.git
   cd Todoapp
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Usage

### Adding a task
1. Write the task title in the "Task Title" field
2. Select start and end times (optional) 
3. Click the "Add Task" button

### Managing tasks
- **✅ Mark as completed:** Click the green check button
- **✏️ Edit:** Click the blue edit button to update the task
- **🗑️ Delete:** Click the red delete button to remove the task

### Filter tasks
Use the filter buttons to display:
- **All** - All tasks
- **Completed** - Only completed tasks  
- **Non-Completed** - Only ongoing tasks

## 📁 Project Structure

```
Todoapp/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── MySnackBar.js      # Toast notifications
│   │   ├── Todo.js             # Individual task component
│   │   └── TodoList.js         # Main component with list
│   ├── contexts/
│   │   ├── ToastContext.js     # Context for toast notifications
│   │   └── todosContext.js     # Context for task management
│   ├── reducers/
│   │   └── todosReducer.js     # State management for tasks
│   ├── App.js                  # Main application
│   ├── App.css                 # Main styles
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── package.json
├── package-lock.json
└── README.md
```

## 🎨 Design Features

- **Gradient backgrounds** for visual appeal
- **Black 3px borders** on all input fields and buttons
- **Responsive breakpoints** for optimal viewing on all devices
- **Hover effects** with enhanced user interaction
- **Gray shadowy labels** that become black on focus/hover

## 🔧 Configuration

The project uses standard Create React App configuration with the following additions:

- **Legacy peer deps** for compatibility with MUI X Date Pickers
- **Material-UI theming** for consistent design
- **LocalStorage** for data persistence

## 📱 Responsive Design

The application is optimized for:
- **Desktop** (md and larger): Full layout with wide buttons
- **Tablet** (sm): Compact layout with adjusted spacing
- **Mobile** (xs): Stacked layout for optimal thumb navigation

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👨‍💻 Developer

**Msjunior10**
- GitHub: [@Msjunior10](https://github.com/Msjunior10)

## External Librarys

- Material-UI team for the fantastic component library
- React team for the powerful frontend framework
- MUI X team for the advanced date picker components

---
