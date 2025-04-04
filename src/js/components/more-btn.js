document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".product__more-btn");
  const contentBlock = document.querySelector(
    ".product__summary-about-content"
  );

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      this.classList.toggle("product__more-btn--active");
      contentBlock.classList.toggle("product__summary-about-content--active");
    });
  }
});
