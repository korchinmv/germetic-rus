document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("counter");
  const incrementBtn = document.getElementById("incrementBtn");
  const decrementBtn = document.getElementById("decrementBtn");

  let count = 1;

  const validateNumberInput = (input) => {
    const value = input.value;

    // Разрешаем только цифры (без точки и других символов)
    const isValid = /^[1-9]+$/.test(value);

    if (!isValid) {
      input.value = "";
      return false;
    }

    return true;
  };

  if (counter) {
    counter.addEventListener("input", () => {
      validateNumberInput(counter);
    });
  }

  const updateCounter = () => {
    counter.value = count;
    decrementBtn.disabled = count <= 1;
  };

  if (incrementBtn && decrementBtn) {
    incrementBtn.addEventListener("click", function () {
      count++;
      updateCounter();
    });

    decrementBtn.addEventListener("click", function () {
      if (count > 0) {
        count--;
        updateCounter();
      }
    });
  }

  updateCounter();
});
