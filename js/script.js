document.addEventListener("DOMContentLoaded", () => {
    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addTodo();
    });
/*  Berfungsi untuk memanggil fungsi yang digunakan untuk memuat data
dari storage (loadDataFromStorage()) ketika semua elemen sudah ready. */
    if (isStorageExist) {
        loadDataFromStorage();
    }
});

/* Berguna untuk catch (menangkap) event yang telah kita buat. Event yang ditangkap
bernama ‘ondatasaved’, yang berfungsi untuk memberitahu kepada observer (event listener)
bahwa data telah berhasil disimpan. Yang mana, event ini dipanggil (dispatch) oleh
fungsi saveData() yang telah kita buat sebelumnya. */
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
/* Digunakan untuk menangkap event ketika data berhasil dimuat ke dalam array todos.
Setelah itu, kita panggil fungsi refreshDataFromTodos() yang telah dibuat sebelumnya. */
document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});