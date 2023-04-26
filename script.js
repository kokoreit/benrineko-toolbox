function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
  /*
  本当はHTML（a href="#section1"）のみで実現可能ですが、
  下記の理由でJSを使用します。
  ↓
  古いブラウザではスムーズスクロールをサポートしていないため。
  */
}