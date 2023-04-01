const select = document.getElementById("select");
const input = document.getElementById("input");
const calculateButton = document.querySelector('#calculate');
const resultTexts = {
  announce: document.querySelector('#result-announce'),
  seireki: document.querySelector('#result-seireki'),
  reiwa: document.querySelector('#result-reiwa'),
  heisei: document.querySelector('#result-heisei'),
  showa: document.querySelector('#result-showa')
};  
const redCor = "#B71C1C";
/*========= 入力イベント ===============*/
select.addEventListener("change", function() {
  if (select.value === "seireki") {
    input.placeholder = "例: 2023";
  } else {
    input.placeholder = "例: 5";
  }
});
/*========= 計算イベント ===============*/
calculateButton.addEventListener("click", () => {
  calculate();
});
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    calculate();
  }
});

/*========= 計算と表示 ===============*/
function calculate() {
  // 入力値を取得（全角数字 → 半角数字）
  const inputNumber = input.value.replace(/[０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
  // 数字以外 → 警告文を表示して終了
  if (!/^\d+$/.test(inputNumber)) {
    resultTexts.announce.innerHTML = `<span style="color:${redCor};font-weight:bold;font-size:24px;">【数字】を入力してください。</span> `;
    resultTexts.seireki.innerHTML = ``;
    resultTexts.reiwa.innerHTML = '';
    resultTexts.heisei.innerHTML = '';
    resultTexts.showa.innerHTML = '';
    return;
  }
  let year = parseInt(inputNumber);
  // 年号 → 西暦
  switch (select.value) {
    case "reiwa":
      year += 2018;
      break;
    case "heisei":
      year += 1988;
      break;
    case "showa":
      year += 1925;
      break;
  }
  // 年号計算
  const reiwaYear = calculateEraYear(year, 2018);
  const heiseiYear = calculateEraYear(year, 1988);
  const showaYear = calculateEraYear(year, 1925);
 // 結果表示
resultTexts.announce.innerHTML = `<span>■■■■■入力値：${select.value} ${inputNumber}年■■■■■</span> `;
resultTexts.seireki.innerHTML = `<span style="color:${redCor};font-weight:bold;">西暦${year}年</span> `;
resultTexts.reiwa.innerHTML = reiwaYear > 0 ? `<span style="color:${redCor};font-weight:bold;">令和${reiwaYear}年</span> ` : `令和${reiwaYear}年 （実在しません）`;
resultTexts.heisei.innerHTML = heiseiYear > 0 && heiseiYear <= 31 ? `<span style="color:${redCor};font-weight:bold;">平成${heiseiYear}年</span> ` : `平成${heiseiYear}年 （実在しません）`;
resultTexts.showa.innerHTML = showaYear > 0 && showaYear <= 64 ? `<span style="color:${redCor};font-weight:bold;">昭和${showaYear}年</span> ` : `昭和${showaYear}年 （実在しません）`;

};
function calculateEraYear(year, baseYear) {
  //【0から-に入る】使用はこっち
  return year - baseYear;
  //いきなり【-1】にする場合はこっち
  // return year - baseYear <= 0 ? year - baseYear - 1 : year - baseYear;
}