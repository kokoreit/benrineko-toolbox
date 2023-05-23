// クーポンの割引率を取得
const couponInput = document.getElementById("coupon-input");
const select = document.getElementById("select");
const discountLimitInput = document.getElementById("discount-limit-input");
const yen = document.querySelector(".yen");
const coupon = document.querySelector(".coupon");
const discountLimitElement = document.querySelector(".discount-limit");

// 変数宣言
let timer;//複数のタイマーIDを格納することがあるからクリアが必要

// 入力欄が変更されたときにクーポン計算を行う関数
function calculateDiscountOnInput() {
  clearTimeout(timer); // タイマーをクリアする
  timer = setTimeout(function() {
    if (couponInput.value && discountLimitInput.value) {
      calculateDiscount();
    }
  }, 500); // 500ミリ秒の遅延を設定する
}

// クーポン計算を行う関数
function calculateDiscount() {
  const discountRate = couponInput.value.replace(/[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
  const selectValue = select.value;
  const discountLimit = discountLimitInput.value.replace(/[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });

  // 割引率の計算
  let rate = discountRate / 100;
  if (selectValue === "discount") {
    rate = discountRate / 10;
  }

  // 計算結果の表示
  yen.textContent = Math.abs(Math.floor(discountLimit / rate)) + " 円";
  coupon.textContent = `${discountRate}${selectValue === "percent" ? "%OFF" : "割引"}`;
  discountLimitElement.textContent = discountLimit + " 円";
}

// セレクトボックスの値が変更されたときに呼び出される関数
function handleSelectChange() {
  // クーポン入力欄のプレースホルダーを変更する
  if (select.value === "percent") {
    couponInput.placeholder = "（例）40";
  } else {
    couponInput.placeholder = "（例） 4";
  }
}

// イベントリスナーを設定する
couponInput.addEventListener("input", calculateDiscountOnInput);
discountLimitInput.addEventListener("input", calculateDiscountOnInput);
select.addEventListener("change", handleSelectChange);