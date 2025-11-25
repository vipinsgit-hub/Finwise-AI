// handle screen switching
const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".bottom-nav .nav-item");

// show a screen by id
function showScreen(name) {
  screens.forEach((s) => {
    if (s.dataset.screen === name) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  });
}

// bottom nav click events
navButtons.forEach((btn) => {
  const target = btn.dataset.target;
  if (!target) return; // skip the center "+" button

  btn.addEventListener("click", () => {
    // update active nav
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // change screen
    showScreen(target);
  });
});
