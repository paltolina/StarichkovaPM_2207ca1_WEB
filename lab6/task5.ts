// Функция для сохранения элементов списка в localStorage
function saveList(): void {
    const todoList = document.getElementById("todo-list") as HTMLElement;
    localStorage.setItem("todoList", todoList.innerHTML);

    // Сохраняем состояние чекбоксов
    const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
    const checkboxStates = Array.from(checkboxes).map((checkbox: HTMLInputElement) => checkbox.checked);
    localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
}

function loadList(): void {
    const todoList = document.getElementById("todo-list") as HTMLElement;
    const savedList = localStorage.getItem("todoList");

    // Если есть сохраненный список, загружаем его
    if (savedList) {
        todoList.innerHTML = savedList;

        // Восстанавливаем состояние чекбоксов
        const checkboxStates = JSON.parse(localStorage.getItem("checkboxStates")) as boolean[];
        if (checkboxStates) {
            const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox: HTMLInputElement, index: number) => {
                checkbox.checked = checkboxStates[index];
            });
        }

        // Устанавливаем обработчик клика на чекбоксы для сохранения списка
        const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox: HTMLInputElement) => {
            checkbox.addEventListener('click', saveList);
        });

        // Устанавливаем обработчик клика на кнопки "Удалить"
        const deleteButtons = todoList.querySelectorAll('button');
        deleteButtons.forEach((button: HTMLButtonElement) => {
            button.addEventListener('click', () => {
                clearItem(button.parentNode as HTMLElement);
            });
        });
    }
}

// Вызываем функцию загрузки при загрузке страницы
window.onload = function(): void {
    loadList();
    updateTodoCount(); // Добавляем вызов функции обновления количества дел
};

// Функция для добавления нового элемента в список
function addItem(): void {
    const newItemInput = document.getElementById("new-item") as HTMLInputElement;

    // Проверяем, чтобы значение поля ввода было непустым
    if (newItemInput.value.trim() !== "") {
        const newItemText = newItemInput.value;

        // Создаем новый элемент списка
        const newListItem = document.createElement("dt");
        newListItem.textContent = newItemText;

        // Создаем чекбокс и устанавливаем его состояние
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = false;

        // Добавляем чекбокс в элемент списка
        newListItem.insertBefore(checkbox, newListItem.firstChild);

        // Создаем кнопку очистки
        const clearButton = document.createElement('button');
        clearButton.textContent = "Удалить";
        clearButton.onclick = function() {
            clearItem(newListItem);
        };
        // Добавляем кнопку очистки рядом с элементом списка
        newListItem.appendChild(clearButton);

        // Добавляем новый элемент в конец списка
        document.getElementById("todo-list")!.appendChild(newListItem);

        // Очищаем поле ввода
        newItemInput.value = "";

        // Сортируем список по наименованию
        sortListByName('asc');

        // Скрыть сообщение о том, что нет дел
        document.querySelector(".no-items-message")!.style.display = "none";

        // Обновляем количество дел
        updateTodoCount();

        // Сохраняем список в localStorage
        saveList();
    }
}

// Функция для очистки конкретного элемента списка
function clearItem(element: HTMLElement): void {
    const todoList = document.getElementById("todo-list") as HTMLElement;
    const itemToRemove = element;

    // Удаляем элемент из списка
    todoList.removeChild(itemToRemove);

    // Сохраняем список в localStorage
    saveList();

    // Если список пуст, показываем сообщение о том, что нет дел
    if (todoList.children.length === 0) {
        document.querySelector(".no-items-message")!.style.display = "block";
    }
    
    // Сортируем список по наименованию
    sortListByName('asc');
    
    // Обновляем количество дел
    updateTodoCount();
}

// Функция для очистки всех элементов списка
function clearAll(): void {
    const todoList = document.getElementById("todo-list") as HTMLElement;

    // Удаляем все элементы из списка
    todoList.innerHTML = "";

    // Показываем сообщение о том, что нет дел
    document.querySelector(".no-items-message")!.style.display = "
