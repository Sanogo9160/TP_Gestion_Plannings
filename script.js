document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const statusInput = document.getElementById('statusInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Charger les tâches depuis le localStorage lors du chargement de la page
    loadTasksFromLocalStorage();

    // Ajouter une tâche
    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const status = statusInput.value;
        
        // Vérifier si tous les champs sont remplis
        if (taskText === '' || dueDate === '' || priority === '' || status === '') {
            alert('Veuillez remplir tous les champs.');
            return; // Arrêter l'exécution de la fonction si un champ est vide
        }

        // Ajouter la tâche si tous les champs sont remplis
        const listItem = createTaskElement(taskText, dueDate, priority, status);
        taskList.appendChild(listItem);
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = '';
        statusInput.value = '';
        taskInput.focus();

        // Enregistrer la tâche dans le localStorage
        saveTaskToLocalStorage();
    }

    // Créer un élément de tâche
    function createTaskElement(taskText, dueDate, priority, status) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="editable">${taskText}</span>
            <input type="text" class="editable" value="${dueDate}">
            <select class="editable">
                <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
                <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
            </select>
            <select class="editable">
                <option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="in_progress" ${status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        return listItem;
    }

    // Charger les tâches depuis le localStorage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const listItem = createTaskElement(task.taskText, task.dueDate, task.priority, task.status);
                taskList.appendChild(listItem);
            });
        }
    }

    // Enregistrer les tâches dans le localStorage
    function saveTaskToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').textContent;
            const dueDate = li.querySelector('.editable:nth-of-type(2)').value;
            const priority = li.querySelector('.editable:nth-of-type(3)').value;
            const status = li.querySelector('.editable:nth-of-type(4)').value;
            tasks.push({ taskText, dueDate, priority, status });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Ajouter une tâche lorsque le bouton est cliqué
    addTaskBtn.addEventListener('click', addTask);

    // Supprimer ou éditer une tâche lorsque les boutons sont cliqués
    taskList.addEventListener('click', function(event) {
        const target = event.target;
        const taskItem = target.closest('li');
        if (target.classList.contains('delete-btn')) {
            taskItem.remove();
            // Mettre à jour le localStorage après la suppression
            saveTaskToLocalStorage();
        } else if (target.classList.contains('edit-btn')) {
            editTask(taskItem);
        } else if (target.classList.contains('save-btn')) {
            saveTask(taskItem);
        }
    });

    // Fonction pour éditer une tâche
    function editTask(taskItem) {
        const editableElements = taskItem.querySelectorAll('.editable');
        editableElements.forEach(element => {
            element.setAttribute('contenteditable', 'true');
            element.classList.add('editing');
        });
        const editButton = taskItem.querySelector('.edit-btn');
        editButton.textContent = 'Save';
        editButton.classList.remove('edit-btn');
        editButton.classList.add('save-btn');
    }

    // Fonction pour sauvegarder une tâche éditée
    function saveTask(taskItem) {
        const editableElements = taskItem.querySelectorAll('.editable');
        editableElements.forEach(element => {
            element.removeAttribute('contenteditable');
            element.classList.remove('editing');
        });
        const saveButton = taskItem.querySelector('.save-btn');
        saveButton.textContent = 'Edit';
        saveButton.classList.remove('save-btn');
        saveButton.classList.add('edit-btn');
        // Mettre à jour le localStorage après l'édition
        saveTaskToLocalStorage();
    }
});
