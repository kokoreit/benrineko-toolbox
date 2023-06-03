/*========= 宣言 ===============*/
//コンテンツ
const beforeBox = document.querySelector(".input-before-contents");
const afterBox = document.querySelector(".input-after-contents");
const outputBeforeBox = document.querySelector(".output-before-contents");
const outputAfterBox = document.querySelector(".output-after-contents");
//入力
const beforePowerInput = document.getElementById("before-power");
const minutesInput = document.getElementById("before-time-minutes");
const secondsInput = document.getElementById("before-time-seconds");
const afterPowerInput = document.getElementById("after-power");
//ボタン
const calculateButton = document.getElementById("calculate-button");

/*========= クラスの付与と削除 ===============*/
function addCalcedClass(){
  beforeBox.classList.add("calced");
  afterBox.classList.add("calced");
  outputBeforeBox.classList.add("calced");
  outputAfterBox.classList.add("calced");
}
function removeCalcedClass() {
  beforeBox.classList.remove("calced");
  afterBox.classList.remove("calced");
  outputBeforeBox.classList.remove("calced");
  outputAfterBox.classList.remove("calced");
}

/*========= ローカルストレージ ===============*/
function localStrage(Action) {
  if (Action === "save") {
    localStorage.setItem("beforePower", beforePowerInput.value);
    localStorage.setItem("minutes", minutesInput.value);
    localStorage.setItem("seconds", secondsInput.value);
    localStorage.setItem("afterPower", afterPowerInput.value);
  } else if (Action === "load") {
    beforePowerInput.value = localStorage.getItem("beforePower") || "500";
    minutesInput.value = localStorage.getItem("minutes") || "0";
    secondsInput.value = localStorage.getItem("seconds") || "0";
    afterPowerInput.value = localStorage.getItem("afterPower") || "800";
  }
}

/*========= ロード ===============*/
window.addEventListener("load", function() {
  localStrage("load");
  //ロード済みクラスを付与する
  beforePowerInput.classList.add("loaded");
  minutesInput.classList.add("loaded");
  secondsInput.classList.add("loaded");
  afterPowerInput.classList.add("loaded");
  calculateButton.classList.add("loaded");
});

/*========= 計算 ===============*/
function calculate() {
  // 入力値の取得
  var beforePower = parseInt(beforePowerInput.value);
  var minutes = parseInt(minutesInput.value) || 0; // nullに対応
  var seconds = parseInt(secondsInput.value) || 0; // nullに対応
  var afterPower = parseInt(afterPowerInput.value);
  // 元の電子レンジの温め時間の表示
  var beforeWElement = document.querySelector(".output-before-w");
  var beforeTimeElement = document.querySelector(".output-before-time");
  beforeWElement.textContent = beforePower + "W";
  beforeTimeElement.textContent = minutes + "分" + seconds + "秒";
  // 変換後の電子レンジの温め時間の計算と表示（bp * s = ap * s）
  var convertedMinutes = Math.floor((beforePower * (minutes * 60 + seconds)) / afterPower / 60); //割れた数
  var convertedSeconds = Math.floor((beforePower * (minutes * 60 + seconds)) / afterPower % 60); //余り
  var afterWElement = document.querySelector(".output-after-w");
  var afterTimeElement = document.querySelector(".output-after-time");
  afterWElement.textContent = afterPower + "W";
  afterTimeElement.textContent = convertedMinutes + "分" + convertedSeconds + "秒";
  addCalcedClass();
  localStrage("save");
}
calculateButton.addEventListener("click", calculate);

/*========= 入力 ===============*/
// セレクタの変更
document.querySelectorAll(".input-before-contents, .input-after-contents, .output-before-contents, .output-after-contents").forEach(function(element) {
  element.addEventListener("change", function() {
    removeCalcedClass();
  });
});
// 入力開始
function handleInputFocus(event) {
  var input = event.target;
  input.value = ""; 
}
// 入力確定
function handleInputBlur(event) {
  var input = event.target;
  if (input.value === "") {
    input.value = "0";
  }
}
// 入力
function handleTimeInputEvent(event) {
  var input = event.target;
  var numbersOnly = input.value.replace(/[^0-9]/g, "");
  input.value = numbersOnly; // エスケープ処理
  removeCalcedClass(); // .calced を削除する
}
//イベントハンドラ（分）
minutesInput.addEventListener("input", handleTimeInputEvent);
minutesInput.addEventListener("focus", handleInputFocus);
minutesInput.addEventListener("blur", handleInputBlur);
//イベントハンドラ（秒）
secondsInput.addEventListener("input", handleTimeInputEvent);
secondsInput.addEventListener("focus", handleInputFocus);
secondsInput.addEventListener("blur", handleInputBlur);

/*========= メモ ===============*/
/*
【AIチェック】
エスケープ処理は、入力時に行なっています。
直接的なメモリリークの問題は見当たりません。
*/