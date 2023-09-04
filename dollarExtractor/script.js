/*========= 定義 ===============*/
const btnContainer = document.getElementById('buttonContainer');
const inputBox = document.getElementById('inputBox');

/*========= アクション ===============*/
// 抽出ボタンがクリックされた時のメソッド
document.getElementById('extractButton').addEventListener('click', function() {
  extract();
});

// 抽出ボタンがクリックされた時のメソッド
document.getElementById('load-and-extractButton').addEventListener('click', function() {
  localStrage("load");
  extract();
});

/*========= ローカルストレージ ===============*/
function localStrage(Action) {
  if (Action === "save") {
    localStorage.setItem("inputText", inputBox.value);
  } else if (Action === "load") {
    inputBox.value = localStorage.getItem("inputText") || "";
  }
}

/*========= 抽出 ===============*/
//抽出
function extract() {
  clearButtons();
  const inputValue = inputBox.value.trim();
  if (inputValue !== '') {
    const constants = extractConstants(inputValue);
    btnContainer.innerHTML = '';
    constants.forEach(function(constant) {
      const button = document.createElement('button');
      button.textContent = constant;//既に抽出された定数の値であり、エスケープ処理は不要

      if (constant.startsWith('/')) {
        button.classList.add('commentButton');
      } else {
        button.classList.add('constantButton');
      }
      buttonContainer.appendChild(button);
    });
    localStrage("save");
    inputBox.value = '';
    showMessage('定数を抜き出しました');
  }
}
//ボタン群のクリア
function clearButtons() {
  /*
    document.addEventListener()を使っている今回は、
    ボタンが生成されたら自動的に登録されて、
    ボタンが削除されたら自動的に削除される
    ＝イベントリスナーの削除は必要ない。
  */

  // ボタンの削除
  btnContainer.innerHTML = '';
}

// ボタンがクリックされた時（nullもあるから分岐で）
document.addEventListener('click', function(event) {
  if (event.target.className === 'constantButton') {
    copyToClipboard(event.target.textContent);
    showMessage(`「${event.target.textContent}」をコピーしました`);
    /*
      このコードにおいては、
      クリップボードにコピーする際には単にテキストを設定しているだけであり、
      特殊文字やHTMLタグのエスケープ処理は不要です。
    */
  }
});

// 定数を抽出するメソッド（改造後）
function extractConstants(inputText) {
  const regex = /\$[^:\s]+|\/\/[^\$]+/g // "$"で始まる文字列または"//"という文字列にマッチ
  const matches = inputText.match(regex); // マッチする部分を配列として取得
  // マッチした部分を返す
  return matches ? matches : [];
}

/*========= 結果に対する動作 ===============*/

//クリップボードにコピー
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// メッセージを表示するメソッド
function showMessage(message) {
  document.getElementById('message').textContent = message;
  setTimeout(function() {
    document.getElementById('message').textContent = '';
  }, 2000);
}