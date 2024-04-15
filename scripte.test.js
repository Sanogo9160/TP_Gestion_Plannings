const { localStorageMock } = require('jest-localstorage-mock');

// Configuration de jest-localstorage-mock
global.localStorage = localStorageMock;

// Importation ou définition des fonctions à tester ici
const { addTask, deleteTask } = require('./scripte'); 

// Les tests sont ici
test('Ajouter une tâche', () => {
    // Définition d'un tableau de tâches initial
    const tasks = [];

    // Ajouter une tâche
    addTask('Nouvelle tâche', '2024-04-12', 'medium', 'pending', tasks);

    // Vérifier si la tâche a été ajoutée avec succès
    expect(tasks.length).toBe(1);
    expect(tasks[0].taskText).toBe('Nouvelle tâche');
});

test('Supprimer une tâche', () => {
    // Définir un tableau de tâches initial avec une tâche
    const tasks = [{ taskText: 'Tâche à supprimer', dueDate: '2024-04-12', priority: 'medium', status: 'pending' }];

    // Supprimer une tâche
    deleteTask('Tâche à supprimer', tasks);

    // Vérifier si la tâche a été supprimée avec succès
    expect(tasks.length).toBe(0);
});




