// Функция для сохранения элементов списка в localStorage
function saveList() {
    var todoList = document.getElementById("todo-list");
    localStorage.setItem("todoList", todoList.innerHTML);

    // Сохраняем состояние чекбоксов
    var checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
    var checkboxStates = Array.from(checkboxes).map(function(checkbox) {
        return checkbox.checked;
    });
    localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
}

function loadList() {
    var todoList = document.getElementById("todo-list");
    var savedList = localStorage.getItem("todoList");

    // Если есть сохраненный список, загружаем его
    if (savedList) {
        todoList.innerHTML = savedList;

        // Восстанавливаем состояние чекбоксов
        var checkboxStates = JSON.parse(localStorage.getItem("checkboxStates"));
        if (checkboxStates) {
            var checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function(checkbox, index) {
                checkbox.checked = checkboxStates[index];
            });
        }

        // Устанавливаем обработчик клика на чекбоксы для сохранения списка
        var checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('click', saveList);
        });

        // Устанавливаем обработчик клика на кнопки "Удалить"
        var deleteButtons = todoList.querySelectorAll('button');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                clearItem(button.parentNode);
            });
        });
    }
}

// Вызываем функцию загрузки при загрузке страницы
window.onload = function() {
    loadList();
    updateTodoCount(); // Добавляем вызов функции обновления количества дел
};

// Функция для добавления нового элемента в список
function addItem() {
    var newItemInput = document.getElementById("new-item");

    // Проверяем, чтобы значение поля ввода было непустым
    if (newItemInput.value.trim() !== "") {
        var newItemText = newItemInput.value;

        // Создаем новый элемент списка
        var newListItem = document.createElement("dt");
        newListItem.textContent = newItemText;

        // Создаем чекбокс и устанавливаем его состояние
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = false;

        // Добавляем чекбокс в элемент списка
        newListItem.insertBefore(checkbox, newListItem.firstChild);

        // Создаем кнопку очистки
        var clearButton = document.createElement('button');
        clearButton.textContent = "Удалить";
        clearButton.onclick = function() {
            clearItem(newListItem);
        };
        // Добавляем кнопку очистки рядом с элементом списка
        newListItem.appendChild(clearButton);

        // Добавляем новый элемент в конец списка
        document.getElementById("todo-list").appendChild(newListItem);

        // Очищаем поле ввода
        newItemInput.value = "";

        // Сортируем список по наименованию
        sortListByName('asc');

        // Скрыть сообщение о том, что нет дел
        document.querySelector(".no-items-message").style.display = "none";

        // Обновляем количество дел
        updateTodoCount();

        // Сохраняем список в localStorage
        saveList();
    }
}

// Функция для очистки конкретного элемента списка
function clearItem(element) {
    var todoList = document.getElementById("todo-list");
    var itemToRemove = element;

    // Удаляем элемент из списка
    todoList.removeChild(itemToRemove);

    // Сохраняем список в localStorage
    saveList();

    // Если список пуст, показываем сообщение о том, что нет дел
    if (todoList.children.length === 0) {
        document.querySelector(".no-items-message").style.display = "block";
    }
    
    // Сортируем список по наименованию
    sortListByName('asc');
    
    // Обновляем количество дел
    updateTodoCount();
}

// Функция для очистки всех элементов списка
function clearAll() {
    var todoList = document.getElementById("todo-list");

    // Удаляем все элементы из списка
    todoList.innerHTML = "";

    // Показываем сообщение о том, что нет дел
    document.querySelector(".no-items-message").style.display = "block";

    // Обновляем количество дел
    updateTodoCount();

    // Сохраняем пустой список в localStorage
    saveList();
}

// Функция для обновления количества дел для каждого режима фильтрации
function updateTodoCount() {
    var allCount = document.getElementById("allCount");
    var completedCount = document.getElementById("completedCount");
    var uncompletedCount = document.getElementById("uncompletedCount");
    var todoList = document.getElementById("todo-list");
    var todoItems = todoList.querySelectorAll("dt");

    // Считаем количество дел для каждого режима фильтрации
    var all = todoItems.length;
    var completed = 0;
    var uncompleted = 0;
    todoItems.forEach(item => {
        item.querySelector('input[type="checkbox"]').checked ? completed++ : uncompleted++;
    });

    // Обновляем текст в скобках для каждой ссылки
    allCount.textContent = all;
    completedCount.textContent = completed;
    uncompletedCount.textContent = uncompleted;
}

// Функция для сортировки списка по наименованию
function sortListByName(order) {
    var todoList = document.getElementById("todo-list");
    var todoItems = Array.from(todoList.querySelectorAll("dt"));

    // Сортируем элементы списка в соответствии с выбранным порядком
    todoItems.sort((a, b) => {
        var textA = a.textContent.toLowerCase();
        var textB = b.textContent.toLowerCase();
        if (order === 'asc') {
            return textA.localeCompare(textB);
        } else {
            return textB.localeCompare(textA);
        }
    });

    // Удаляем текущие элементы из списка
    todoList.innerHTML = "";

    // Добавляем отсортированные элементы обратно в список
    todoItems.forEach(item => {
        todoList.appendChild(item);
    });

    // Устанавливаем обработчик клика на чекбоксы для сохранения списка
    var checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('click', saveList);
    });

    // Сохраняем список в localStorage
    saveList();
}
