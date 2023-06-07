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

/*========= 背景イメージの処理 ===============*/
const bkImg = document.querySelector('.bkImg');
const initialOffset = bkImg.offsetTop;
const initialPosition = bkImg.style.position;
const initialTop = bkImg.style.top;

function updatePosition() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  bkImg.style.transform = `translateY(${initialOffset - scrollTop * 0.3}px)`;
}
function resetPosition() {
  bkImg.style.position = initialPosition;
  bkImg.style.transform = 'none'; // transformを初期状態に戻す
  updatePosition();
}

window.addEventListener('scroll', updatePosition);
window.addEventListener('resize', resetPosition);//windowサイズが変化した時

/*
topプロパティではなくtransformプロパティを使用すると、アニメーションがスムーズになる主な理由は以下の通りです。

    GPU アクセラレーションの活用: transform プロパティを使用することで、ブラウザはGPUを使用してアニメーションを処理します。GPUは通常、ハードウェアアクセラレーションをサポートしており、より効率的にアニメーションを描画することができます。その結果、スムーズな動きが実現されます。

    合成レイヤーの使用: transform プロパティを使用すると、ブラウザは要素を独立した合成レイヤーに配置します。合成レイヤーはハードウェアアクセラレーションによって処理され、他の要素との重なりやアニメーションの描画を最適化します。これにより、背景画像の移動がスムーズになります。

一方で、top プロパティを使用すると、ブラウザは要素の位置を変更するためにレイアウト計算を行います。レイアウト計算は相対的にコストが高く、ブラウザのパフォーマンスに影響を与える可能性があります。そのため、アニメーションがスムーズになりにくい場合があります。

加えて、transform プロパティを使用する場合は、translateY() 関数を使用して垂直方向の移動を行っています。translateY() 関数はハードウェアアクセラレーションによる最適化を受けやすく、高速でスムーズなアニメーションを実現できます。

したがって、transform プロパティを使用することで、GPU アクセラレーションや合成レイヤーの活用により、スムーズなアニメーションが得られるのです。
*/