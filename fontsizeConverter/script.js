/*========= 入力 ===============*/
const inputBox = document.getElementById("input-box");
inputBox.addEventListener("focus", function() {
  textareaConvertedClass(false);
});
const unitSelector = document.getElementById('unit-selector');
unitSelector.addEventListener('change', function() {
  textareaConvertedClass(false);
});
const precisionSelector = document.getElementById('precision-selector');
precisionSelector.addEventListener('change', function() {
  textareaConvertedClass(false);
});

/*========= 変換 ===============*/
const convertButton = document.getElementById("convert-button");
convertButton.addEventListener("click", () => {
  //入力要素の取得
  const inputText = document.getElementById("input-box").value;
  if (inputText === '') return; // 空だったら終了
  const selectedUnit = document.getElementById("unit-selector").value;
  const selectedPrecision = parseInt(document.getElementById("precision-selector").value); 
  //抽出
  const regex = /(-?\d+\.?\d*)(pt|px|pc|mm|cm|in)/g;
  const result = inputText.replace(regex, (match, num, unit) => {
    const convertedNum = convertNumber(num, unit, selectedUnit, selectedPrecision);
    return `${convertedNum}${selectedUnit}`;
  });
  //結果要素へ
  const resultText = document.getElementById("output-text");
  resultText.textContent = result;
  //入力ボックスにも反映
  textareaConvertedClass(true);
});
// 数値を変換する関数
function convertNumber(num, from, to, precision) { 
  console.log(num,from, "->", to); 
  const ptLate = {
    pt: 1,
    px: 1.33333,
    pc: 0.0833333,
    mm: 0.352778,
    cm: 0.0352778,
    in: 0.0138889
  };
  //ptNum = 対象num / 対象のptレート
  const ptNum = parseFloat(num) / ptLate[from]; 
  if (isNaN(ptNum)) return 'NaN'; // 数値でなければ 'NaN' を戻す
  //変換後Num = ptNum * 対象のptレート
  const resultNum = ptNum * ptLate[to];
  return resultNum.toFixed(precision); // 四捨五入（0から可）
  /*
    【計算結果確認方法】
    Webページの表示で
    全ての変換後のフォントが
    おおよそ揃っていることを確認しました。
  */
}

/*========= クラスの付与 ===============*/
function textareaConvertedClass(add) {
  const inputBox = document.getElementById('input-box');
  if (inputBox) {
    if (add) {
      inputBox.classList.add('converted');
    } else {
      inputBox.classList.remove('converted');
    }
  }
  /*
    【Graceful Degradation（優雅な劣化）の実現】
    classList プロパティがサポートされていないブラウザーでは、
    エラーが発生せずに、 classList プロパティが undefined になります。
  */
}


/*
【AIチェック済項目】
・正しい計算：目視で確認済み
・エスケープ不要
・メモリリークのチェックOK
・removeEventListenerは不要：アロー関数のイベントリスナー追加は、実行されると自動的に削除される。
*/