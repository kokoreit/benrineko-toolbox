//ロードが完了されてからイベントを追加する
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('#menu-button');
  const menuContents = document.querySelector('#menu-contents');

  //メニューのオンオフ
  function toggleMenu() {
    menuContents.classList.toggle('show');
    menuButton.classList.toggle('opened');
  }
  menuButton.addEventListener('click', toggleMenu);
  
  //メニューを閉じる
  function closeMenu(event) {
    if (!menuButton.contains(event.target) && !menuContents.contains(event.target)) {
      menuContents.classList.remove('show');
      menuButton.classList.remove('opened');
    }
  }
  document.addEventListener('click', closeMenu);

  // イベントリスナーを解除
  function removeEventListeners() {
    menuButton.removeEventListener('click', toggleMenu);
    document.removeEventListener('click', closeMenu);
  }
  window.addEventListener('unload', removeEventListeners);
});

// /*
// メモリリークok
// */