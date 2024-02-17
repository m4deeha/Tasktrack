
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
      const tasksContainer = document.getElementById("tasks");
      tasksContainer.innerHTML = '';

      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
        <h3>Tasks</h3>
          <h4>${task.title}</h4>
          <p>${task.description}</p>
          <p>Due Date: ${task.dueDate}</p>
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksContainer.appendChild(taskElement);
      });
    }

    function addTask() {
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
      const dueDate = document.getElementById("due-date").value;

      if (!title || !dueDate) {
        alert("Title and Due Date are required.");
        return;
      }

      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate
      };

      tasks.push(newTask);
      saveTasksToLocalStorage();
      renderTasks();
      clearInputFields();
    }

    function editTask(id) {
      const taskToEdit = tasks.find(task => task.id === id);
      if (!taskToEdit) {
        return;
      }

      // Prompt the user to edit the task details
      const updatedTitle = prompt("Edit Title:", taskToEdit.title);
      const updatedDescription = prompt("Edit Description:", taskToEdit.description);
      const updatedDueDate = prompt("Edit Due Date:", taskToEdit.dueDate);

      if (updatedTitle !== null && updatedDueDate !== null) {
        taskToEdit.title = updatedTitle.trim();
        taskToEdit.description = updatedDescription.trim();
        taskToEdit.dueDate = updatedDueDate;
        saveTasksToLocalStorage();
        renderTasks();
      }
    }

    function deleteTask(id) {
      const indexToDelete = tasks.findIndex(task => task.id === id);
      if (indexToDelete !== -1) {
        tasks.splice(indexToDelete, 1);
        saveTasksToLocalStorage();
        renderTasks();
      }
    }

    function sortTasks() {
      const sortBy = document.getElementById("sort-by").value;
      tasks.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      renderTasks();
    }

    function filterTasks() {
      const filterDueDate = document.getElementById("filter-due-date").value;
      const filteredTasks = tasks.filter(task => task.dueDate === filterDueDate);
      renderTasks(filteredTasks);
    }

    function saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function clearInputFields() {
      document.getElementById("title").value = '';
      document.getElementById("description").value = '';
      document.getElementById("due-date").value = '';
    }

    // Initial render
    renderTasks();
