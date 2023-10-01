/*========= セーブとロード ===============*/
function saveTrackingNumberToLocalStorage(trackingNumber) {
  localStorage.setItem("previousTrackingNumber", trackingNumber);
}

function loadTrackingNumberFromLocalStorage() {
  return localStorage.getItem("previousTrackingNumber");
}

/*========= ロードボタン ===============*/
document.getElementById("load_previous_input").addEventListener("click", function () {
  const trackingNumberInput = document.getElementById("tracking_number");
  const previousTrackingNumber = loadTrackingNumberFromLocalStorage();
  if (previousTrackingNumber) {
    trackingNumberInput.value = previousTrackingNumber;
  }
});

/*========= クリアボタン ===============*/
function clearText() {
  document.getElementById('tracking_number').value = '';
}

/*========= 入力処理（エスケープ処理） ===============*/
function escapeHtml(text) {
  /*
    XSS対策（エスケープ処理）:
    直接ユーザーからの入力をHTMLに反映する場合、
    この処理を通してください。
  */
  const div = document.createElement('div');
  div.textContent = text; // textをエスケープしてテキストノードとして反映する
  return div.innerHTML; // エスケープされたHTMLを文字列として返す
}

function removeHyphens(str) {
  return str.replace(/-/g, '');
}

/*========= 外部ボタン ===============*/
function createClickHandler(serviceURL) {
  return function () {
    const trackingNumber = removeHyphens(document.getElementById("tracking_number").value);
    if (trackingNumber) {
      // エスケープ
      const escapedTrackingNumber = escapeHtml(trackingNumber);
      // 保存
      saveTrackingNumberToLocalStorage(trackingNumber);
      // URLを開く
      const trackingURL = serviceURL + escapedTrackingNumber;
      window.open(trackingURL, "_blank");
    } else {
      alert("追跡番号を入力してください。");
    }
  };
}

document.getElementById("japan_post").addEventListener("click", createClickHandler("https://trackings.post.japanpost.jp/services/srv/search/direct?org.apache.struts.taglib.html.TOKEN=&searchKind=S002&locale=ja&SVID=&reqCodeNo1="));
document.getElementById("sagawa").addEventListener("click", createClickHandler("https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo="));
document.getElementById("yamato").addEventListener("click", createClickHandler("https://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id="));