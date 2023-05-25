// XSS対策: ユーザーの入力をエスケープして、安全にHTMLに反映する
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text; // textをエスケープしてテキストノードとして反映する
  return div.innerHTML; // エスケープされたHTMLを文字列として返す
}
/*========= main（AIで致命的な欠陥チェック済み） ===============*/
const inputText = document.getElementById('input-text');
const generateBtn = document.getElementById('generate-btn');
const colorButtons = document.getElementById('color-buttons');
const announcement = document.getElementById('announcement');

// イベントリスナーの設定
generateBtn.addEventListener('click', generateColors);
inputText.addEventListener('keydown', handleKeyDown);

// キー入力イベントハンドラ
function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    generateColors();
  }
}

// カラーコードを生成するメソッド
function generateColors() {

  clearColorButtons();

  // 入力されたテキストからカラーコードを抽出する
  const text = inputText.value;
  const regex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
  const matches = text.match(regex);

  // カラーコードが見つかった場合、ボタンを生成する
  if (matches && matches.length > 0) {
    colorButtons.innerHTML = '';
    matches.slice(0, 20).forEach(color => {
      const colorBtn = createColorButton(color);
      colorButtons.appendChild(colorBtn);
    });
  } else {
    // ボタンの削除
    while (colorButtons.firstChild) {
      colorButtons.removeChild(colorButtons.firstChild);
    }

    // 例: エラーメッセージの表示
    announcement.textContent = 'カラーコードが見つかりませんでした。';
  }
}

// カラーボタンをクリア
function clearColorButtons() {

  // 生成されたカラーボタンのイベントリスナーの削除
  const colorBtns = document.getElementsByClassName('color-btn');
  for (let i = 0; i < colorBtns.length; i++) {
    const colorBtn = colorBtns[i];
    colorBtn.removeEventListener('click', handleColorButtonClick);
  }

  // ボタンの削除
  colorButtons.innerHTML = '';
}

// カラーボタンを生成する
function createColorButton(color) {
  const colorBtn = document.createElement('button');
  colorBtn.classList.add('color-btn');
  colorBtn.textContent = color.toLowerCase();
  colorBtn.style.backgroundColor = color;
  colorBtn.addEventListener('click', handleColorButtonClick);
  return colorBtn;
}

// カラーボタンがクリックされたときのイベントハンドラ
function handleColorButtonClick() {
  const text = this.textContent;
  copyToClipboard(text);
  announcement.textContent = 'カラーコードをコピーしました。';
  event.target.focus();
}

// テキストをクリップボードにコピーするメソッド
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
    // console.log('クリップボードにコピーしました。');
  })
    .catch(err => {
    console.error('クリップボードのコピーに失敗しました。', err);
  });
}


/*========= simulation ===============*/
const backgroundColorInput = document.querySelector('.background-color-input');
const textColorInput = document.querySelector('.text-color-input');
const textSizeInput = document.querySelector('.text-size-input');
const textSizeSlider = document.querySelector('.text-size-slider');
const textInput = document.querySelector('.text-input');
const resultText = document.querySelector('.result-text');
const textSizeDecreaseBtn = document.querySelector('#text-size-decrese-btn');
const textSizeIncreaseBtn = document.querySelector('#text-size-increase-btn');
const resultSection = document.querySelector('.s-result-section');
const maxSize = parseInt(textSizeSlider.max);

// 初期値の設定
resultSection.style.backgroundColor = backgroundColorInput.value;
resultText.style.color = textColorInput.value;
resultText.style.fontSize = textSizeInput.value;
textSizeSlider.value = parseInt(textSizeInput.value); 

// 色の反映
function setColor(input, colorProperty) {
  const text = input.value;
  const colorCode = text.match(/#[0-9A-Fa-f]{3,6}|rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)/);
  if (colorCode === null || colorCode[0] !== text) { 
    input.style.backgroundColor = '#ffdddd';
  } else {
    input.style.backgroundColor = '#fff';
    if (colorProperty === 'backgroundColor') {
      resultSection.style.backgroundColor = escapeHtml(colorCode[0]); // 背景色を設定
    } else if (colorProperty === 'textColor') {
      resultText.style.color = escapeHtml(colorCode[0]); // 文字色を設定
    }
  }
  // HTMLに反映する前にエスケープ処理を行う
  resultSection.style.backgroundColor = escapeHtml(resultSection.style.backgroundColor);
  resultText.style.color = escapeHtml(resultText.style.color);
}

// 背景色の入力値が変更されたときの処理
backgroundColorInput.addEventListener('input', (event) => {
  setColor(event.target, 'backgroundColor');
});

// テキストの色の入力値が変更されたときの処理
textColorInput.addEventListener('input', (event) => {
  setColor(event.target, 'textColor');
});

// テキストのサイズの入力値が変更されたときの処理
textSizeInput.addEventListener('input', (event) => {
  let inputValue = event.target.value;
  // 入力値が数字のみか数字 + "px" の形式であるかを検証
  if (!/^\d+$|^\d+px$/.test(inputValue)) {
    // エラー処理など適切な処理を追加
    textSizeInput.style.backgroundColor = '#ffdddd';
    console.error('無効なサイズの入力値です');
    return;
  }
  // 数値のみの場合にはpxを付加して再設定
  if (!inputValue.endsWith('px')) {
    inputValue += 'px';
  }
  // 数値部分を抜き出して数値に変換
  const sizeValue = parseInt(inputValue);
  // サイズが制限を超えた場合にエラー
  if (sizeValue <= 0 || sizeValue > maxSize) {
    // エラー処理など適切な処理を追加
    textSizeInput.style.backgroundColor = '#ffdddd';
    console.error('無効なサイズの入力値です');
    return;
  } else {
    textSizeInput.style.backgroundColor = '#fff';
  }
  // スライダーの値を設定
  textSizeSlider.value = sizeValue;//int
  // 結果テキストに反映
  resultText.style.fontSize = inputValue;//str+px
});


// スライダーの値が変更されたときの処理
textSizeSlider.addEventListener('input', (event) => {
  //現在の値を取得
  const newValue = event.target.value + 'px';
  //反映
  textSizeInput.value = newValue;//イベントは発生しない
  resultText.style.fontSize = newValue;
  textSizeInput.style.backgroundColor = '#fff';
});

// テキストの入力値が変更されたときの処理
textInput.addEventListener('input', (event) => {
  resultText.textContent = event.target.value;
});

/*========= 増減ボタン ===============*/
function changeTextSize(direction) {
  //現在値の取得
  const currentSize = 
        parseInt(textSizeInput.value) ||
        parseInt(getComputedStyle(resultText).fontSize);
  /*
    null、undefined、NaN、空文字列などの場合には || の後ろの式が評価される
    maxSizeを超えた値を取得してしまったら、後の構文ではねられる。
  */

  //現在値を増減させる
  const delta = (direction === 1) ? 1 : -1;
  const newSize = currentSize + delta;

  // 最大値と最小値の範囲内である場合のみ反映
  if (newSize >= 0 && newSize <= maxSize) {
    textSizeInput.value = newSize + 'px';
    resultText.style.fontSize = newSize + 'px';
    textSizeSlider.value = newSize;
    textSizeInput.style.backgroundColor = '#fff';
  }
}

let increaseIntervalId;
textSizeIncreaseBtn.addEventListener('click', () => {
  changeTextSize(1);
});
textSizeIncreaseBtn.addEventListener('mousedown', () => {
  increaseIntervalId = setInterval(() => {
    changeTextSize(1);
  }, 100);
});
textSizeIncreaseBtn.addEventListener('mouseup', () => {
  clearInterval(increaseIntervalId); // mouseupイベントが発生したらsetIntervalをクリアする
});
textSizeIncreaseBtn.addEventListener('mouseout', () => {
  clearInterval(increaseIntervalId); // mouseoutイベントが発生したらsetIntervalをクリアする
});

let decreaseIntervalId;
textSizeDecreaseBtn.addEventListener('click', () => {
  changeTextSize(-1);
});
textSizeDecreaseBtn.addEventListener('mousedown', () => {
  decreaseIntervalId = setInterval(() => {
    changeTextSize(-1);
  }, 100);
});
textSizeDecreaseBtn.addEventListener('mouseup', () => {
  clearInterval(decreaseIntervalId); // mouseupイベントが発生したらsetIntervalをクリアする
});
textSizeDecreaseBtn.addEventListener('mouseout', () => {
  clearInterval(decreaseIntervalId); // mouseoutイベントが発生したらsetIntervalをクリアする
});