const menuButton = document.querySelector('#menu-button');
const menuContents = document.querySelector('#menu-contents');

menuButton.addEventListener('click', function() {
  menuContents.classList.toggle('show');
  menuButton.classList.toggle('opened');
});

document.addEventListener('click', function(event) {
  if (!menuButton.contains(event.target) && !menuContents.contains(event.target)) {
    menuContents.classList.remove('show');
    menuButton.classList.remove('opened');
  }
});

/*
メモリリークok
*/