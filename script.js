document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskDescription = document.getElementById('taskDescription').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const teamMember = document.getElementById('teamMember').value;
    const customerContact = document.getElementById('customerContact').value;
    const personInCharge = document.getElementById('personInCharge').value;
    const date = document.getElementById('date').value;

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

    tasks.forEach((task) => {
        const row = taskListTable.insertRow();

        row.innerHTML = `
            <td>${task.taskDescription}</td>
            <td>${task.taskStatus}</td>
            <td>${task.teamMember}</td>
            <td>${task.customerContact}</td>
            <td>${task.personInCharge}</td>
            <td>${task.date}</td>
        `;
    });
}

// Display tasks when the page loads
window.onload = displayTasks;
