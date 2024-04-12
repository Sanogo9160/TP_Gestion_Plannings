// Déclarer un tableau pour stocker les tâches
let tasks = [];

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

        // Ajouter la tâche au tableau de tâches
        tasks.push({ taskText, dueDate, priority, status });

        // Mettre à jour l'affichage et le stockage local
        updateTaskList();

        // Réinitialiser les valeurs des champs
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = '';
        statusInput.value = '';
        taskInput.focus(); // Pour ramener le focus sur le champ de saisie de la tâche
    }

    // Créer un élément de tâche
    function createTaskElement(taskText, dueDate, priority, status) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="editable task-text">${taskText}</span>
            <input type="text" class="editable" value="${dueDate}">
            <select class="editable">
                <option value="low" ${priority === 'low' ? 'selected' : ''}>Basse</option>
                <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Moyenne</option>
                <option value="high" ${priority === 'high' ? 'selected' : ''}>Haute</option>
            </select>
            <select class="editable">
                <option value="pending" ${status === 'pending' ? 'selected' : ''}>En attente</option>
                <option value="in_progress" ${status === 'in_progress' ? 'selected' : ''}>En cours</option>
                <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completée</option>
            </select>
            <button class="edit-btn">Modifier</button>
            <button class="delete-btn">Supprimer</button>
        `;
        return listItem;
    }

    // Charger les tâches depuis le localStorage
    function loadTasksFromLocalStorage() {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
        if (tasksFromLocalStorage) {
            tasks = tasksFromLocalStorage;
            updateTaskList();
        }
    }

    // Enregistrer les tâches dans le localStorage
    function saveTaskToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Mettre à jour la liste des tâches dans le DOM en fonction du tableau de tâches
    function updateTaskList() {
        // Effacer la liste actuelle des tâches
        taskList.innerHTML = '';
        
        // Ajouter chaque tâche du tableau au DOM
        tasks.forEach(task => {
            const listItem = createTaskElement(task.taskText, task.dueDate, task.priority, task.status);
            taskList.appendChild(listItem);
        });

        // Enregistrer les tâches mises à jour dans le stockage local
        saveTaskToLocalStorage();
    }

    // Ajouter une tâche lorsque le bouton est cliqué
    addTaskBtn.addEventListener('click', addTask);

    // Supprimer ou éditer une tâche lorsque les boutons sont cliqués
    taskList.addEventListener('click', function(event) {
        const target = event.target;
        const taskItem = target.closest('li');
        if (target.classList.contains('delete-btn')) {
            taskItem.remove();
            // Mettre à jour le tableau de tâches après la suppression
            tasks = tasks.filter(task => task.taskText !== taskItem.querySelector('.task-text').textContent);
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
        editButton.textContent = 'Enregistrer';
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
        saveButton.textContent = 'Modifier';
        saveButton.classList.remove('save-btn');
        saveButton.classList.add('edit-btn');

        // Mettre à jour la tâche dans le tableau
        tasks.forEach(task => {
            if (task.taskText === taskItem.querySelector('.task-text').textContent) {
                task.dueDate = taskItem.querySelector('.editable:nth-of-type(2)').value;
                task.priority = taskItem.querySelector('.editable:nth-of-type(3)').value;
                task.status = taskItem.querySelector('.editable:nth-of-type(4)').value;
            }
        });

        // Mettre à jour le localStorage après l'édition
        saveTaskToLocalStorage();
    }
});
