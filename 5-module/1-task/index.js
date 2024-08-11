function hideSelf() {
  // ваш код...
  let button = document.querySelector('.hide-self-button');
  button.onclick = test;

  function test() {
    button.hidden = true;
  }
}
