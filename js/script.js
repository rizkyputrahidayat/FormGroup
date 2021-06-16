document.addEventListener("DOMContentLoaded", () => {
    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addTodo();
    });

    if (isStorageExist) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});