function hideSelf() {
  // ваш код...
  let button = document.querySelector('.hide-self-button');

  function hiddenButton() {
    button.hidden = true;
  }

  button.onclick = hiddenButton;
}
