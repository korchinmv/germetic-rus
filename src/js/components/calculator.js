document.addEventListener("DOMContentLoaded", function () {
  // Элементы выбора объёма
  const volumeLabels = document.querySelectorAll(".checkbox-wrapper__label");
  const productVolumeText = document.querySelector(".calculator__text-num");

  // Поля ввода размеров шва
  const widthInput = document.getElementById("width");
  const depthInput = document.getElementById("depth");
  const lengthInput = document.getElementById("length");

  // Элемент для вывода результата
  const resultNumElement = document.querySelector(".calculator__result-num");

  // Функция для добавления " мм" к значению
  const addMMSuffix = (input) => {
    if (!input.value.endsWith(" мм") && input.value.trim() !== "") {
      input.value = input.value.replace(/ мм$/, "") + " мм";
    }
  };

  // Функция для валидации ввода (только числа)
  const validateNumberInput = (input) => {
    // Сохраняем позицию курсора
    const cursorPosition = input.selectionStart;

    // Удаляем все символы, кроме цифр и точки
    const numericValue = input.value.replace(/[^0-9.]/g, "");

    // Если значение содержит нечисловые символы - очищаем поле
    if (numericValue !== input.value.replace(/ мм$/, "")) {
      input.value = "";
      return false;
    }

    // Восстанавливаем позицию курсора
    setTimeout(() => {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);

    return true;
  };

  // Функция для получения числового значения
  const getNumericValue = (input) => {
    return parseFloat(input.value.replace(/ мм$/, "")) || 0;
  };

  // Функция для вычисления результата
  const calculateResult = () => {
    const activeVolumeLabel = Array.from(volumeLabels).find((label) =>
      label.classList.contains("active")
    );

    if (!activeVolumeLabel) return;

    const volumeText = activeVolumeLabel.childNodes[0].textContent.trim();
    const volumeValue = parseFloat(volumeText);

    const width = getNumericValue(widthInput);
    const depth = getNumericValue(depthInput);
    const length = getNumericValue(lengthInput);

    productVolumeText.textContent = volumeText;

    if (width === 0 || depth === 0 || length === 0) {
      resultNumElement.textContent = "0";
      return;
    }

    const result = Math.ceil((width * depth * length) / (volumeValue * 1.05));
    resultNumElement.textContent = result.toString();
  };

  // Обработчики для переключателей объёма
  volumeLabels.forEach((label) => {
    label.addEventListener("click", () => {
      volumeLabels.forEach((l) => l.classList.remove("active"));
      label.classList.add("active");
      calculateResult();
    });
  });

  // Обработчики для полей ввода
  [widthInput, depthInput, lengthInput].forEach((input) => {
    // Добавляем "мм" при клике
    input.addEventListener("click", () => {
      if (input.value.trim() === "") {
        input.value = " мм";
        // Устанавливаем курсор перед " мм"
        input.setSelectionRange(0, 0);
      }
    });

    // Валидация при вводе
    input.addEventListener("input", () => {
      if (validateNumberInput(input)) {
        // Если ввод валиден, добавляем " мм" если его нет
        if (!input.value.endsWith(" мм") && input.value.trim() !== "") {
          input.value += " мм";
        }
      }
      calculateResult();
    });

    // Добавляем "мм" при потере фокуса, если есть число
    input.addEventListener("blur", () => {
      if (input.value.replace(/ мм$/, "").trim() !== "") {
        addMMSuffix(input);
      } else {
        input.value = "";
      }
      calculateResult();
    });

    // Валидация при вставке из буфера
    input.addEventListener("paste", (e) => {
      setTimeout(() => {
        if (validateNumberInput(input)) {
          addMMSuffix(input);
        }
        calculateResult();
      }, 0);
    });
  });

  // Инициализация калькулятора
  calculateResult();
});
