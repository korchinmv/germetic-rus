document.addEventListener("DOMContentLoaded", function () {
  const volumeLabels = document.querySelectorAll(".checkbox-wrapper__label");
  const productVolumeTexts = document.querySelectorAll(".calculator__text-num");

  // Поля ввода размеров шва
  const widthInput = document.getElementById("width");
  const depthInput = document.getElementById("depth");
  const lengthInput = document.getElementById("length");
  const widthInputMobile = document.getElementById("widthMobile");
  const depthInputMobile = document.getElementById("depthMobile");
  const lengthInputMobile = document.getElementById("lengthMobile");
  const resultNumElement = document.getElementById("result");
  const resultNumElementMobile = document.getElementById("resultMobile");

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
  const calculateResult = (widthEl, depthEl, lengthEl, resultEl) => {
    const activeVolumeLabel = Array.from(volumeLabels).find((label) =>
      label.classList.contains("active")
    );

    if (!activeVolumeLabel) return;

    const volumeText = activeVolumeLabel.childNodes[0].textContent.trim();
    const volumeValue = parseFloat(volumeText);

    const width = getNumericValue(widthEl);
    const depth = getNumericValue(depthEl);
    const length = getNumericValue(lengthEl);

    // Обновляем все элементы с объемом
    productVolumeTexts.forEach((el) => (el.textContent = volumeText));

    if (width === 0 || depth === 0 || length === 0) {
      resultEl.textContent = "0";
      return;
    }

    const result = Math.ceil((width * depth * length) / (volumeValue * 1.05));

    resultEl.textContent = result.toString();
  };

  // Обработчики для переключателей объёма
  volumeLabels.forEach((label) => {
    label.addEventListener("click", () => {
      volumeLabels.forEach((l) => l.classList.remove("active"));
      label.classList.add("active");

      // Рассчитываем для обеих версий
      if (widthInput && depthInput && lengthInput) {
        calculateResult(widthInput, depthInput, lengthInput, resultNumElement);
      }
      if (widthInputMobile && depthInputMobile && lengthInputMobile) {
        calculateResult(
          widthInputMobile,
          depthInputMobile,
          lengthInputMobile,
          resultNumElementMobile
        );
      }
    });
  });

  // Функция для настройки обработчиков событий
  const setupInputHandlers = (input) => {
    if (!input) return;

    // Добавляем "мм" при клике
    input.addEventListener("click", () => {
      if (input.value.trim() === "") {
        input.value = " мм";
        input.setSelectionRange(0, 0);
      }
    });

    // Валидация при вводе
    input.addEventListener("input", () => {
      if (validateNumberInput(input)) {
        if (!input.value.endsWith(" мм") && input.value.trim() !== "") {
          input.value += " мм";
        }
      }

      // Рассчитываем для обеих версий
      if (widthInput && depthInput && lengthInput) {
        calculateResult(widthInput, depthInput, lengthInput, resultNumElement);
      }
      if (widthInputMobile && depthInputMobile && lengthInputMobile) {
        calculateResult(
          widthInputMobile,
          depthInputMobile,
          lengthInputMobile,
          resultNumElementMobile
        );
      }
    });

    // Добавляем "мм" при потере фокуса, если есть число
    input.addEventListener("blur", () => {
      if (input.value.replace(/ мм$/, "").trim() !== "") {
        addMMSuffix(input);
      } else {
        input.value = "";
      }
    });

    // Валидация при вставке из буфера
    input.addEventListener("paste", () => {
      setTimeout(() => {
        if (validateNumberInput(input)) {
          addMMSuffix(input);
        }
      }, 0);
    });
  };

  // Настраиваем обработчики для всех полей ввода
  [
    widthInput,
    depthInput,
    lengthInput,
    widthInputMobile,
    depthInputMobile,
    lengthInputMobile,
  ].forEach(setupInputHandlers);

  // Инициализация калькулятора
  if (widthInput && depthInput && lengthInput) {
    calculateResult(widthInput, depthInput, lengthInput, resultNumElement);
  }
  if (widthInputMobile && depthInputMobile && lengthInputMobile) {
    calculateResult(
      widthInputMobile,
      depthInputMobile,
      lengthInputMobile,
      resultNumElementMobile
    );
  }
});
