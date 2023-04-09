// ボタンがクリックされた時のメソッド（ソートなし）
document.getElementById('extractButton').addEventListener('click', function() {
  const inputBox = document.getElementById('inputBox');
  const inputValue = inputBox.value.trim();
  if (inputValue !== '') {
    const constants = extractConstants(inputValue);
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = '';
    constants.forEach(function(constant) {
      const button = document.createElement('button');
      button.textContent = constant;
      button.className = 'constantButton';
      buttonContainer.appendChild(button);
    });
    inputBox.value = '';
    showMessage('定数を抜き出しました');
  }
});


// ボタンがクリックされた時（nullもあるから分岐で）
document.addEventListener('click', function(event) {
  if (event.target.className === 'constantButton') {
    copyToClipboard(event.target.textContent);
    showMessage(`「${event.target.textContent}」をコピーしました`);
  }
});

// 定数を抽出するメソッド（改造後）
function extractConstants(inputText) {
  const regex = /\$[^:\s]+|\/\/[^\$]+/g // "$"で始まる文字列または"//"という文字列にマッチ
  const matches = inputText.match(regex); // マッチする部分を配列として取得
  // マッチした部分を返す
  return matches ? matches : [];
}


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


// document.getElementById('extractButton').addEventListener('click', function() {
//   const inputBox = document.getElementById('inputBox');
//   const inputValue = inputBox.value.trim();
//   if (inputValue !== '') {
//     const constants = inputValue.split(' ');
//     const buttonContainer = document.getElementById('buttonContainer');
//     buttonContainer.innerHTML = '';
//     constants.forEach(function(constant) {
//       const button = document.createElement('button');
//       button.textContent = constant;
//       button.className = 'constantButton';
//       buttonContainer.appendChild(button);
//     });
//     inputBox.value = '';
//     showMessage('定数を抜き出しました');
//   }
// });

// document.addEventListener('click', function(event) {
//   if (event.target.className === 'constantButton') {
//     copyToClipboard(event.target.textContent);
//     showMessage(`「${event.target.textContent}」をコピーしました`);
//   }
// });

// function copyToClipboard(text) {
//   const textarea = document.createElement('textarea');
//   textarea.value = text;
//   document.body.appendChild(textarea);
//   textarea.select();
//   document.execCommand('copy');
//   document.body.removeChild(textarea);
// }

// function showMessage(message) {
//   const messageElement = document.createElement('div');
//   messageElement.textContent = message;
//   messageElement.className = 'message';
//   document.body.appendChild(messageElement);
//   setTimeout(function() {
//     document.body.removeChild(messageElement);
//   }, 2000);
// }