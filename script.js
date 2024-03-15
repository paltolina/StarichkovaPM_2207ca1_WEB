function checkItems() {
    var todoList = document.getElementById("todo-list");
    var noItemsMessage = document.querySelector(".no-items-message");

    // Если в списке нет элементов, показываем сообщение, иначе скрываем
    if (todoList.children.length === 0) {
        noItemsMessage.style.display = "block";
    } else {
        noItemsMessage.style.display = "none";
    }
}

// Функция для добавления нового элемента в список
function addItem() {
    var newItemInput = document.getElementById("new-item");
    var todoList = document.getElementById("todo-list");

    // Проверяем, чтобы значение поля ввода было непустым
    if (newItemInput.value.trim() !== "") {
        var newItemText = newItemInput.value;

        // Создаем новый элемент списка
        var newListItem = document.createElement("dt");
        newListItem.innerHTML = `
            <input type="checkbox">
            ${newItemText}
            <button onclick="clearItem(this)">Очистить</button>
        `;

        // Добавляем новый элемент в конец списка
        todoList.appendChild(newListItem);

        // Очищаем поле ввода
        newItemInput.value = "";

        // Скрыть сообщение о том, что нет дел
        document.querySelector(".no-items-message").style.display = "none";
    }
}

// Функция для очистки конкретного элемента списка
function clearItem(element) {
    var todoList = document.getElementById("todo-list");
    var itemToRemove = element.parentNode;

    // Удаляем элемент из списка
    todoList.removeChild(itemToRemove);

    // Если список пуст, показываем сообщение о том, что нет дел
    if (todoList.children.length === 0) {
        document.querySelector(".no-items-message").style.display = "block";
    }
}

// Функция для очистки всех элементов списка
function clearAll() {
    var todoList = document.getElementById("todo-list");

    // Удаляем все элементы из списка
    todoList.innerHTML = "";

    // Показываем сообщение о том, что нет дел
    document.querySelector(".no-items-message").style.display = "block";
}
