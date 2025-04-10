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

  // Функция для добавления единиц измерения к значению
  const addUnitSuffix = (input, isLength = false) => {
    const unit = isLength ? " м" : " мм";
    if (!input.value.endsWith(unit) && input.value.trim() !== "") {
      input.value = input.value.replace(/ (м|мм)$/, "") + unit;
    }
  };

  // Функция для валидации ввода (только числа)
  const validateNumberInput = (input, isLength = false) => {
    // Сохраняем позицию курсора
    const cursorPosition = input.selectionStart;

    // Удаляем все символы, кроме цифр и точки
    const numericValue = input.value.replace(/[^0-9.]/g, "");

    // Если значение содержит нечисловые символы - очищаем поле
    const currentValue = input.value.replace(isLength ? / м$/ : / мм$/, "");
    if (numericValue !== currentValue) {
      input.value = "";
      return false;
    }

    // Восстанавливаем позицию курсора
    setTimeout(() => {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);

    return true;
  };

  // Функция для получения числового значения с учетом единиц измерения
  const getNumericValue = (input, isLength = false) => {
    const value = input.value.replace(isLength ? / м$/ : / мм$/, "");
    const numValue = parseFloat(value) || 0;
    return isLength ? numValue : numValue; // длина уже в метрах, другие параметры в мм
  };

  // Функция для вычисления результата
  const calculateResult = (widthEl, depthEl, lengthEl, resultEl) => {
    const activeVolumeLabel = Array.from(volumeLabels).find((label) =>
      label.classList.contains("active")
    );

    if (!activeVolumeLabel) return;

    const volumeText = activeVolumeLabel.childNodes[0].textContent.trim();
    const volumeValue = parseFloat(volumeText);

    const width = getNumericValue(widthEl); // в мм
    const depth = getNumericValue(depthEl); // в мм
    const length = getNumericValue(lengthEl, true); // в метрах

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
  const setupInputHandlers = (input, isLength = false) => {
    if (!input) return;

    // Добавляем единицы измерения при клике
    input.addEventListener("click", () => {
      if (input.value.trim() === "") {
        input.value = isLength ? " м" : " мм";
        input.setSelectionRange(0, 0);
      }
    });

    // Валидация при вводе
    input.addEventListener("input", () => {
      if (validateNumberInput(input, isLength)) {
        const unit = isLength ? " м" : " мм";
        if (!input.value.endsWith(unit) && input.value.trim() !== "") {
          input.value += unit;
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

    // Добавляем единицы измерения при потере фокуса, если есть число
    input.addEventListener("blur", () => {
      if (input.value.replace(isLength ? / м$/ : / мм$/, "").trim() !== "") {
        addUnitSuffix(input, isLength);
      } else {
        input.value = "";
      }
    });

    // Валидация при вставке из буфера
    input.addEventListener("paste", () => {
      setTimeout(() => {
        if (validateNumberInput(input, isLength)) {
          addUnitSuffix(input, isLength);
        }
      }, 0);
    });
  };

  // Настраиваем обработчики для всех полей ввода
  // Ширина и глубина в мм (isLength = false)
  setupInputHandlers(widthInput, false);
  setupInputHandlers(depthInput, false);
  setupInputHandlers(widthInputMobile, false);
  setupInputHandlers(depthInputMobile, false);

  // Длина в метрах (isLength = true)
  setupInputHandlers(lengthInput, true);
  setupInputHandlers(lengthInputMobile, true);

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
