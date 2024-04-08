# Nom du projet: TP_Gestion_Plannings


### Partie HTML (index.html)

- J'ai d'abord créer Une structure HTML de base comprenant une balise `<div>` avec une classe `.container` pour contenir l'application.
- Ensuite j'ai ajouter des éléments tels que `<input>`, `<select>`, et `<button>` pour permettre à l'utilisateur de saisir et d'ajouter de nouvelles tâches.
-Par la suite, j'ai créer une liste `<ul>` avec comme identifiant `taskList` pour afficher les tâches ajoutées.

### Partie CSS (styles.css)

- A ce niveau j'ai appliqué des Styles de base pour le corps de la page, le conteneur, les titres, l'image, et également aux champs de saisie, les boutons et les éléments de liste pour une présentation agréable.

### Partie JavaScript (script.js)

- J'ai procedé à la récuperation les éléments du DOM et à initialisation des gestionnaires d'événements.
- Chargement des tâches depuis le stockage local lors du chargement de la page.
- Ajout des tâches à la liste lorsque l'utilisateur clique sur le bouton "Add Task", en vérifiant que tous les champs sont remplis avant d'ajouter uen nouvelle tache.
- Création de manière dynamique des éléments HTML représentant une tâche avec les informations saisies.
- Enregistrement des tâches dans le stockage local pour les conserver.
- Possibilité pour l'utilisateur de supprimer des tâches en cliquant sur un bouton de suppression(Delete).
- Option pour l'utilisateur d'éditer des tâches en cliquant sur un bouton d'édition(Edit), en rendant les éléments éditables, puis enregistrant les modifications avec un bouton de sauvegarde(Save).

Ceci m a permis de créer une application de liste de tâches interactive, où l'utilisateur peut ajouter, modifier et supprimer des tâches, tout en conservant les données localement dans le navigateur.