/*========= ラジオボタンの処理 ===============*/
function selectRadioButton(selectedButton) {
  const id = selectedButton.getAttribute('id');

  // 選択されたラベルを強調表示するための処理
  const selectedLabel = document.querySelector(`label[for="${id}"]`);
  const labels = document.querySelectorAll('label[for]');
  labels.forEach(label => {
    label.classList.remove('selected');
  });
  selectedLabel.classList.add('selected');

  // 選択されたラジオボタンに応じた背景画像を設定する処理
  // const container = document.querySelector('.container');
  const container = document.querySelector('.bkImg');
  container.classList.remove('forestBkImg', 'riverBkImg', 'tomtitBkImg');
  container.classList.add(`${id}BkImg`);

  // 選択されたラジオボタンに応じてオーディオを再生する処理
  const audio = document.getElementById(`${id}Sound`);
  const playingAudio = document.querySelector('audio.playing');
  if (playingAudio && playingAudio.id === `${id}Sound`) {
    // 同じオーディオが再生中の場合は何もしない
    return;
  } else if (playingAudio) {
    // 他のオーディオが再生中の場合は停止する
    playingAudio.pause();
    playingAudio.currentTime = 0;
    playingAudio.classList.remove('playing');
  }
  //オーディオが存在していたら再生する
  if (audio) {
    audio.play();
    audio.classList.add('playing');
    /*
    【このオーディオの再生方法について】
     HTMLで読み込んだものを再生するだけなので
     メモリの管理が簡単です。
    */
  }
}
// ラジオボタンが選択されたときに、ラジオボタンとそのラベルのスタイルを変更する
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(button => {
  button.addEventListener('change', () => {
    selectRadioButton(button);
  });
});
// 初期読み込み時に、ラジオボタンとそのラベルのスタイルを設定する
window.addEventListener('load', function() {
  const labels = document.querySelectorAll('label');
  labels.forEach(function(label) {
    label.style.display = 'block';
  });
  const noneRadioButton = document.getElementById('none');
  selectRadioButton(noneRadioButton);
});
/*
【ローカルストレージ却下の理由】
ほとんどのブラウザはオーディオの自動再生を無効に設定されているため、
ユーザーが明示的にアクション（ボタンをクリック）をする必要があります。
（ロードイベントやスクロールアクションも同様に無効です。）
*/

// /*========= 背景イメージの処理 ===============*/
// const bkImg = document.querySelector('.bkImg');
// const initialOffset = bkImg.offsetTop;
// const initialPosition = bkImg.style.position;
// const initialTop = bkImg.style.top;
// let animationId; // アニメーションのIDを保持する変数
// let isScrolling = false; // スクロール中かどうかを示すフラグ
// let scrollTimeout; // スクロール停止のタイムアウトIDを保持する変数

// // 背景位置の更新
// function updatePosition() {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   // bkImg.style.transform = `translateY(${initialOffset - scrollTop * 0.3}px)`;
//   bkImg.style.transform = `translate3d(0, ${initialOffset - scrollTop * 0.3}px, 0)`;
//   /*
//   【topよりtransform】
//   ・GPUを使用するので、より効率的にアニメーションを描画・スムーズな動きが実現されます。
//   ・要素を独立した合成レイヤーに配置、最適化、背景画像の移動がスムーズになります。
//   ・top（レイアウト計算）：相対的にコストが高く、アニメーションがスムーズになりにくい。
//   ・translateY() 関数はハードウェアアクセラレーションによる最適化を受けやすく、高速でスムーズなアニメーションを実現できます。
//   */
// }
// // アニメーションループ
// function animate() {
//   updatePosition();
//   animationId = requestAnimationFrame(animate);//予約
//   /*
//   【requestAnimationFrameがパフォーマンスが良い理由】
//   ブラウザは最適なタイミングでアニメーションを実行します。
//   ブラウザやタブが非表示の時、アニメーションは一時停止されます。
//  */
// }
// // アニメーションの開始
// function startAnimation() {
//   if (!animationId && isScrolling) {
//     animationId = requestAnimationFrame(animate);//予約
//   }
// }
// // アニメーションの停止
// function stopAnimation() {
//   if (animationId) {
//     cancelAnimationFrame(animationId);
//     animationId = undefined;
//   }
// }
// // スクロールイベントを処理する
// function handleScroll() {
//   //アニメーションループスタート
//   isScrolling = true;
//   startAnimation();
//   //時間が経ったらアニメーションループを停止する
//   clearTimeout(scrollTimeout);　// タイマーの削除
//   scrollTimeout = setTimeout(function() {
//     isScrolling = false;
//     stopAnimation();
//   }, 200);
// }
// // 背景位置のリセット
// function resetPosition() {
//   bkImg.style.position = initialPosition;
//   bkImg.style.transform = 'none';
//   updatePosition();
// }
// // クリーンアップ
// function cleanup() {
//   stopAnimation();
//   clearTimeout(scrollTimeout); // タイマーの削除
//   window.removeEventListener('scroll', handleScroll);
//   window.removeEventListener('resize', resetPosition);
//   window.removeEventListener('beforeunload', cleanup);
// }
// window.addEventListener('scroll', handleScroll);
// window.addEventListener('resize', resetPosition);
// window.addEventListener('beforeunload', cleanup);
// startAnimation();

/*
【背景処理のコメントアウトの理由】
スペックが低い端末ではアニメーション処理のもたつきが起こります。
アニメーション処理は端末にやらせない方が良いです。
（端末の情報の取得の分岐はセキュリティ面の理由から却下です。）

以上の理由から、代替案が見つかるまでコメントアウトします。
*/