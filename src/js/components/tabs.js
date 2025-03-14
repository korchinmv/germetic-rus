const tabs = document.querySelectorAll(".tabs__nav-item");
const contents = document.querySelectorAll(".tabs__panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("tabs__nav-item--active"));
    tab.classList.add("tabs__nav-item--active");

    const target = tab.getAttribute("data-target");

    contents.forEach((content) => {
      if (content.id === target) {
        content.classList.add("tabs__panel--active");
      } else {
        content.classList.remove("tabs__panel--active");
      }
    });
  });
});
