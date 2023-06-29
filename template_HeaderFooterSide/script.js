/*
【このJS】
1. ロード直後にside-menu-contentsにサイドメニューのテンプレートを追加します。
2. 以下の動作に連動してbodyに.side-menu-onをトグルさせます。

【HTMLで用意するもの（z-indexの推進の順位）】
id="overlay"（z-index: 10000; //扱いやすく他でも使えるのでオススメです。）
id="side-menu-contents"（z-index: 10001;) 
id="side-menu-button"（z-index: 10002;)

（以下任意：メインコンテナに付与して連動させると便利です。）
id="side-menu-clip-container"
*/

/*========= メニューのテンプレート ===============*/
/* どこから呼び出されても良い様に、絶対位置リンク形式を採用します。 */
const sideMenuTemplate = `
        <p>生活</p>
        <a href="https://benrineko.com/wTimeConverter/index.html">電子レンジw時間変換</a>
        <a href="https://benrineko.com/couponotoku/index.html">クーポンお得計算機</a>
        <a href="https://benrineko.com/natureSounds/index.html">自然音（環境音）</a>
        <a href="https://benrineko.com/nengouhenkan/index.html">年号変換</a>
        <p>開発</p>
        <a href="https://benrineko.com/dollarExtractor/index.html">$変数コピペツール</a>
        <a href="https://benrineko.com/hashExtractor/index.html">カラーコード抽出機</a>
        <a href="https://benrineko.com/fontsizeConverter/index.html">フォントサイズ単位変換</a>`;

/*========= DOM ===============*/
const sideMenuButton = document.querySelector("#side-menu-button");
const sideMenuContents = document.querySelector("#side-menu-contents");
const forSideMenuOverlay = document.querySelector("#overlay");

const forSideMenuAddClassName = 'side-menu-on';
// fixed要素の参照
const fixedElement = forSideMenuOverlay;
let initialFixedPosition; // fixed要素の初期位置

/*========= 動作 ===============*/
//ロード
document.addEventListener('DOMContentLoaded', function() {
  sideMenuContents.innerHTML = sideMenuTemplate;
});
// メニューボタンにイベントリスナーを追加
sideMenuButton.addEventListener("click", function () {
  document.body.classList.toggle(forSideMenuAddClassName);
});
// メニューボタンにイベントリスナーを追加
forSideMenuOverlay.addEventListener("click", function () {
  document.body.classList.toggle(forSideMenuAddClassName);
});

/*========= onclic ===============*/
function focusAndBlur(button) {
  clearTimeout(button.timerId);//存在しなくてもOKです
  button.focus();
  button.timerId = setTimeout(function() {
    button.blur();
  }, 100);
}