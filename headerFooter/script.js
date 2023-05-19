const headerMenuButton = document.querySelector("#header-menu-button");
const headerMenuContents = document.querySelector("#header-menu-contents");
const overlay = document.querySelector(".overlay");

headerMenuButton.addEventListener("click", function () {
  headerMenuContents.classList.toggle("show");
  updateMenuState();
});

overlay.addEventListener("click", function () {
  headerMenuContents.classList.remove("show");
  updateMenuState();
});

function updateMenuState() {
  if (headerMenuContents.classList.contains("show")) {
    headerMenuButton.classList.add("header-menu-showed");
    overlay.style.display = "block";
  } else {
    headerMenuButton.classList.remove("header-menu-showed");
    overlay.style.display = "none";
  }
}