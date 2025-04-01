const labelRadioBtns = document.querySelectorAll(
  ".product__summary-item-list .checkbox-wrapper label"
);
const radioHidden = document.querySelectorAll(".modern-radio");

function checkCheckbox() {
  radioHidden.forEach((checkbox, index) => {
    if (checkbox.checked) {
      labelRadioBtns[index]?.classList.add("active");
    } else {
      labelRadioBtns[index]?.classList.remove("active");
    }
  });
}

labelRadioBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(checkCheckbox, 0);
  });
});
checkCheckbox();
