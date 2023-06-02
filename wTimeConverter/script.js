/*========= 計算 ===============*/
document.getElementById("calculate-button").addEventListener("click", function() {
  // 入力値の取得
  var beforePower = parseInt(document.getElementById("before-power").value);
  var minutes = parseInt(document.getElementById("before-time-minutes").value) || 0; // nullに対応
  var seconds = parseInt(document.getElementById("before-time-seconds").value) || 0; // nullに対応
  var afterPower = parseInt(document.getElementById("after-power").value);
  // 元の電子レンジの温め時間の表示
  var beforeWElement = document.querySelector(".output-before-w");
  var beforeTimeElement = document.querySelector(".output-before-time");
  beforeWElement.textContent = beforePower + "W";
  beforeTimeElement.textContent = minutes + "分" + seconds + "秒";
  // 変換後の電子レンジの温め時間の計算と表示（bp * s = ap * s）
  var convertedMinutes = Math.floor((beforePower * (minutes * 60 + seconds)) / afterPower / 60);//割れた数
  var convertedSeconds = Math.floor((beforePower * (minutes * 60 + seconds)) / afterPower % 60);//余り
  var afterWElement = document.querySelector(".output-after-w");
  var afterTimeElement = document.querySelector(".output-after-time");
  afterWElement.textContent = afterPower + "W";
  afterTimeElement.textContent = convertedMinutes + "分" + convertedSeconds + "秒";
  addCalcedClass();
});

/*========= 入力アクション ===============*/
// セレクタの変更
document.querySelectorAll(".input-before-contents, .input-after-contents, .output-before-contents, .output-after-contents").forEach(function(element) {
  element.addEventListener("change", function() {
    removeCalcedClass();
  });
});
//時間の入力
function handleTimeInputEvent(event) {
  var input = event.target.value;
  var numbersOnly = input.replace(/[^0-9]/g, "");
  event.target.value = numbersOnly; // エスケープ処理
  removeCalcedClass(); // .calced を削除する
}
document.getElementById("before-time-minutes").addEventListener("input", handleTimeInputEvent);
document.getElementById("before-time-seconds").addEventListener("input", handleTimeInputEvent);

/*========= クラスの付与と削除 ===============*/
function addCalcedClass(){
  var beforeBox = document.querySelector(".input-before-contents");
  var afterBox = document.querySelector(".input-after-contents");
  var outputBeforeBox = document.querySelector(".output-before-contents");
  var outputAfterBox = document.querySelector(".output-after-contents");
  beforeBox.classList.add("calced");
  afterBox.classList.add("calced");
  outputBeforeBox.classList.add("calced");
  outputAfterBox.classList.add("calced");
}
function removeCalcedClass() {
  var beforeBox = document.querySelector(".input-before-contents");
  var afterBox = document.querySelector(".input-after-contents");
  var outputBeforeBox = document.querySelector(".output-before-contents");
  var outputAfterBox = document.querySelector(".output-after-contents");
  beforeBox.classList.remove("calced");
  afterBox.classList.remove("calced");
  outputBeforeBox.classList.remove("calced");
  outputAfterBox.classList.remove("calced");
}
/*
【AIチェック】
エスケープ処理は、入力時に行なっています。
直接的なメモリリークの問題は見当たりません。
*/