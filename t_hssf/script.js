/*
【このJS】
1. ロード直後に各テンプレートを追加します。（目的：一括管理）
2. 以下の動作に連動してbodyに.side-menu-onをトグルさせます。

【HTMLで用意するもの（z-indexの推進の順位）】
id="overlay"（z-index: 10000; //扱いやすく他でも使えるのでオススメです。）
id="side-menu-button"（z-index: 10001;)
*/

/*==ドメインURL（要チェック！） ==*/
const domain = 'https://benrineko.com';

/*========= テンプレート ===============*/
const headerTemplate = `
    <a class="logo" href="${domain}/index.html" aria-label="ホームに移動する" onclick="focusAndBlur(this)"></a>
      <button id="side-menu-button" class="title-burger" aria-label="他のツールをサイドバーに表示する" onclick="focusAndBlur(this)">
        <p class="title">全ツール</p>
        <div class="burger">
          <div class="span-container">
            <span class="s1"></span>
            <span class="s2"></span>
            <span class="s3"></span>
          </div>
        </div>
      </button>
`;
const sideMenuTemplate = `
    <p>生活</p>
    <a href="${domain}/wTimeConverter/index.html">電子レンジw時間変換</a>
    <a href="${domain}/couponotoku/index.html">クーポンお得計算機</a>
    <a href="${domain}/natureSounds/index.html">自然音（環境音）</a>
    <a href="${domain}/nengouhenkan/index.html">年号変換</a>
    <a href="${domain}/takuhai/index.html">宅配配達の追跡</a>
    <p>開発</p>
    <a href="${domain}/dollarExtractor/index.html">$変数コピペツール</a>
    <a href="${domain}/hashExtractor/index.html">カラーコード抽出機</a>
    <a href="${domain}/fontsizeConverter/index.html">フォントサイズ単位変換</a>
`;
// シェアのための結果テキスト変数を定義
let shareResultText = "シェアする結果のテキストです。";

const currentURL = window.location.href;
const encodedCurrentURL = encodeURIComponent(currentURL);
const pageTitle = document.title;
const encodedPageTitle = encodeURIComponent(pageTitle);
const shareContentsTemplate = `
 <i class="fa fa-share fa-2x share-icon"></i>
      <div class="share-buttons">
        <a href="https://twitter.com/share?url=${encodedCurrentURL}&text=${encodedPageTitle}" target="_blank" class="share-button twitter" aria-label="Twitterでシェアする">
          <i class="fab fa-twitter fa-2x"></i>
        </a>
        <a href="https://facebook.com/sharer/sharer.php?u=${encodedCurrentURL}&quote=${encodedPageTitle}" target="_blank" class="share-button facebook" aria-label="Facebookでシェアする">
          <i class="fab fa-facebook fa-2x"></i>
        </a>
        <a href="https://pinterest.com/pin/create/button/?url=${encodedCurrentURL}&description=${encodedPageTitle}" target="_blank" class="share-button pinterest" aria-label="Pinterestでシェアする">
          <i class="fab fa-pinterest fa-2x"></i>
        </a>
        <a href="https://www.linkedin.com/shareArticle?url=${encodedCurrentURL}&title=${encodedPageTitle}" target="_blank" class="share-button linkedin" aria-label="LinkedInでシェアする">
          <i class="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
`;


const footerTemplate = `
      <a href="https://fontawesome.com/" class="fontawesome">Font Awesome by Dave Gandy</a>
      <a href="${domain}/copyright/index.html" class="copyright">コピーライト・プライバシーポリシー・免責事項</a>
`;
/*========= DOM ===============*/
//テンプレ表示領域
const headerContents = document.querySelector("#header");
const sideMenuContents = document.querySelector("#side-menu-contents");
const shareContents = document.querySelector("#share-contents");
const footerContents = document.querySelector("#footer");

//ボタン
const sideMenuButton = document.getElementById("side-menu-button");
//ボタンによって付与するクラス名
const forSideMenuAddClassName = 'side-on';
//オーバーレイ
const forSideMenuOverlay = document.querySelector("#overlay");

/*========= 動作 ===============*/
//ロード
document.addEventListener('DOMContentLoaded', function() {
  sideMenuContents.innerHTML = sideMenuTemplate;
  shareContents.innerHTML =  shareContentsTemplate;
  footerContents.innerHTML =  footerTemplate;
  headerContents.innerHTML =  headerTemplate;//sideMenuButtonを含みます

  // ロード前は存在しないので、ここでイベントを追加します
  const sideMenuButton = document.getElementById('side-menu-button');
  sideMenuButton.addEventListener('click', handleSideMenuButtonClick);//要メモリ管理
});
// side-menu-buttonのクリックイベントの処理
function handleSideMenuButtonClick(event) {
  document.body.classList.toggle(forSideMenuAddClassName);
}
// オーバーレイにイベントリスナーを追加
forSideMenuOverlay.addEventListener("click", function () {
  document.body.classList.toggle(forSideMenuAddClassName);
});
// アンロード前
window.addEventListener('beforeunload', function() {
  sideMenuButton.removeEventListener('click', handleSideMenuButtonClick);//メモリ解放
});

/*========= onclic ===============*/
function focusAndBlur(button) {
  clearTimeout(button.timerId);//Idが存在しなくてもOKです
  button.focus();
  button.timerId = setTimeout(function() {
    button.blur();
  }, 100);
}