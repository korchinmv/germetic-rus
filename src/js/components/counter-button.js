const counter = document.getElementById("counter");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");

let count = 1;

const updateCounter = () => {
  counter.textContent = count;
  decrementBtn.disabled = count <= 1;
};

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

updateCounter();
