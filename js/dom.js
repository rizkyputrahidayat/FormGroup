const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
// berfungsi sebagai object key yang akan digunakan untuk menyimpan id dari masing-masing task pada objek HTMLElement.
const TODO_ITEMID = "itemId";

const addTodo = () => {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    const todo = makeTodo(textTodo, timestamp, false);
    const todoObject = composeTodoObject(textTodo, timestamp, false);

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();
}

const makeTodo = (data, timestamp, isCompleted) => {
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textTimeStamp = document.createElement("p");
    textTimeStamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton())
    } else {
        container.append(createCheckButton());
    }

    return container;
}

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", (event) => {
        eventListener(event);
    });

    return button;
}

function addTaskToCompleted(taskElement /* HTMLELement */) {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    // Berfungsi untuk memperbarui status (isCompleted) dari masing-masing objek TODO
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    // Update lagi identifier yang ada pada elemen TODO yang baru
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
 }

const createCheckButton = () => {
    return createButton("check-button", (event) => {
        addTaskToCompleted(event.target.parentElement);
    });
}

const removeTaskFromCompleted = (taskElement) => {
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);
// Menghapus objek tersebut dengan menggunakan fungsi splice().
    taskElement.remove();
    updateDataToStorage();
}

const createTrashButton = () => {
    return createButton("trash-button", (event) => {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

const undoTaskFromCompleted = (taskElement) => {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    // Mengubah statusnya menjadi not completed
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

const createUndoButton = () => {
    return createButton("undo-button", (event) => {
        undoTaskFromCompleted(event.target.parentElement);
    });
}