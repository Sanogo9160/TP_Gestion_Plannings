// Importer la bibliothèque de tests (avec Jest)
// Il est nécessaire d'installer Jest avec npm ou yarn avant de l'utiliser
const { test, expect } = require('@jest/globals');

// Importation ou définition des fonctions à tester
// Dans ce cas précis, il s'agit des fonctions addTask et deleteTask

test('Ajouter une tâche', () => {
    // Définir un tableau de tâches initial
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
