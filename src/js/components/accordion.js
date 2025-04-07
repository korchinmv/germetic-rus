document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion__item");

  accordionItems.forEach((item) => {
    const btn = item.querySelector(".accordion__btn");
    const content = item.querySelector(".accordion__content");

    btn.addEventListener("click", () => {
      // Закрываем все другие открытые аккордеоны
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("open")) {
          otherItem.classList.remove("open");
          otherItem.querySelector(".accordion__content").style.maxHeight = "0";
        }
      });

      // Переключаем текущий аккордеон
      item.classList.toggle("open");

      if (item.classList.contains("open")) {
        // Устанавливаем точную высоту для плавной анимации
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0";
      }
    });
  });

  // Опционально: открыть первый аккордеон по умолчанию
  // accordionItems[0].classList.add('open');
  // accordionItems[0].querySelector('.accordion__content').style.maxHeight =
  //   accordionItems[0].querySelector('.accordion__content').scrollHeight + 'px';
});
