document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskDescription = document.getElementById('taskDescription').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const teamMember = document.getElementById('teamMember').value;
    const customerContact = document.getElementById('customerContact').value;
    const personInCharge = document.getElementById('personInCharge').value;
    const date = document.getElementById('date').value;

    // Validate form data
    if (!taskDescription || !taskStatus || !teamMember || !customerContact || !personInCharge || !date) {
        alert('Please fill out all fields.');
        return;
    }

    // Create task object
    const task = {
        taskDescription,
        taskStatus,
        teamMember,
        customerContact,
        personInCharge,
        date
    };

    // Retrieve existing tasks from localStorage or initialize an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the tasks array
    tasks.push(task);

    // Save the updated tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the task list display
    displayTasks();

    // Reset form
    document.getElementById('taskForm').reset();
});

// Function to display tasks in the table
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskListTable = document.getElementById('taskList').getElementsByTagName('tbody')[0];

    // Clear current table rows
    taskListTable.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = taskListTable.insertRow();

        row.innerHTML = `
            <td>${task.taskDescription}</td>
            <td>${task.taskStatus}</td>
            <td>${task.teamMember}</td>
            <td>${task.customerContact}</td>
            <td>${task.personInCharge}</td>
            <td>${task.date}</td>
            <td>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
    });
}

// Function to delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);  // Remove the task at the given index
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Save the updated tasks array
    displayTasks();  // Re-render the updated task list
}

// Function to edit a task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    // Pre-fill the form with the task data
    document.getElementById('taskDescription').value = task.taskDescription;
    document.getElementById('taskStatus').value = task.taskStatus;
    document.getElementById('teamMember').value = task.teamMember;
    document.getElementById('customerContact').value = task.customerContact;
    document.getElementById('personInCharge').value = task.personInCharge;
    document.getElementById('date').value = task.date;

    // Change the form's submit behavior to update the task instead of adding it
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = 'Update Task';

    // Update the submit button's functionality to edit the task
    submitButton.onclick = function() {
        updateTask(index);
    };
}

// Function to update the task
function updateTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks[index] = {
        taskDescription: document.getElementById('taskDescription').value,
        taskStatus: document.getElementById('taskStatus').value,
        teamMember: document.getElementById('teamMember').value,
        customerContact: document.getElementById('customerContact').value,
        personInCharge: document.getElementById('personInCharge').value,
        date: document.getElementById('date').value
    };

    // Save the updated tasks array
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Reset the form and button after update
    document.getElementBy
