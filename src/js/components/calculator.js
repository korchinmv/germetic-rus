document.addEventListener("DOMContentLoaded", function () {
  const counter = document.getElementById("counter");
  const incrementBtn = document.getElementById("incrementBtn");
  const decrementBtn = document.getElementById("decrementBtn");

  let count = 1;

  const updateCounter = () => {
    counter.value = count;
    decrementBtn.disabled = count <= 1;
  };

  if (incrementBtn && decrementBtn && counter) {
    incrementBtn.addEventListener("click", function () {
      count++;
      updateCounter();
    });

    decrementBtn.addEventListener("click", function () {
      if (count > 1) {
        count--;
        updateCounter();
      }
    });
  }

  if (counter) {
    // Обработчик ручного ввода
    counter.addEventListener("change", function () {
      let newValue = parseInt(this.value);
      if (isNaN(newValue) || newValue < 1) {
        newValue = 1;
      }
      count = newValue;
      updateCounter();
    });

    // Запрещаем ввод нечисловых значений
    counter.addEventListener("keydown", function (e) {
      // Разрешаем: backspace, delete, tab, escape, enter
      if (
        [46, 8, 9, 27, 13].includes(e.keyCode) ||
        // Разрешаем: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Разрешаем: цифры на основной клавиатуре и цифровом блоке
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105)
      ) {
        return;
      }
      // Запрещаем все остальное
      e.preventDefault();
    });

    updateCounter();
  }
});
