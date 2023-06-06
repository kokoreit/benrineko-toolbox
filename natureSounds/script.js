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


let bkImg = document.querySelector('.bkImg');
let initialOffset = bkImg.offsetTop;
let initialPosition = bkImg.style.position;
let initialTop = bkImg.style.top;

function updatePosition() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  bkImg.style.top = (initialOffset - scrollTop * 0.2) + 'px';
}
function resetPosition() {
  bkImg.style.position = initialPosition;
  bkImg.style.top = initialTop;
  initialOffset = bkImg.offsetTop;
  updatePosition();
}
window.addEventListener('scroll', updatePosition);
window.addEventListener('resize', resetPosition);//windowサイズが変化した時