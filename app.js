document.addEventListener('DOMContentLoaded', function () {
    let input = document.querySelector('.entered-List');
    let dueDateInput = document.querySelector('.due-date');
    let prioritySelect = document.querySelector('.priority');
    let statusSelect = document.querySelector('.status');
    let addBtn = document.querySelector('.add-List');
    let tasks = document.querySelector('.tasks');

    input.addEventListener('keyup', function () {
        if (input.value.trim() !== "") {
            addBtn.classList.add('active');
        } else {
            addBtn.classList.remove('active');
        }
    });

    addBtn.addEventListener('click', function () {
        if (input.value.trim() !== "" ) {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
                <p>${input.value}</p>
                <p>Due Date: ${dueDateInput.value}</p>
                <p>Priority: ${prioritySelect.value}</p>
                <p>Status: ${statusSelect.value}</p>
                <div class="item-btn">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </div>
            `;
            tasks.appendChild(newItem);
            input.value = '';
            dueDateInput.value = '';
            prioritySelect.selectedIndex = 0;
            statusSelect.selectedIndex = 0;
        } else {
            alert('Remplissez les champs');
        }
    });
});
