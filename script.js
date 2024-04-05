document.addEventListener("DOMContentLoaded", function() {
    var addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", addTask);
});

function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    var dueDate = document.getElementById("due-date").value;
    var priority = document.getElementById("priority").value;
    var status = document.getElementById("status").value;
    var taskList = document.getElementById("taskList");

    if (taskInput.trim() !== "") {
        var li = document.createElement("li");
        
        var taskDetails = document.createElement("div");
        taskDetails.textContent = taskInput + " - Date d'échéance: " + dueDate + " - Priorité: " + priority + " - Statut: " + status;
        
        var deleteButton = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.addEventListener("click", function() {
            taskList.removeChild(li);
        });
        
        li.appendChild(taskDetails);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        
        // Réinitialisation des champs après l'ajout d'une tâche
        document.getElementById("taskInput").value = "";
        document.getElementById("due-date").value = "";
        document.getElementById("priority").value = "low";
        document.getElementById("status").value = "À faire";
    } else {
        alert("Veuillez saisir une tâche valide !");
    }
}
