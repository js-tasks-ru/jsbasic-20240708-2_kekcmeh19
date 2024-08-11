function toggleText() {
  // ваш код...
  let button = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');
  
  function hiddenTextByButton() {
    if (text.getAttribute('hidden') == 'true') {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', true);
    }
  }

  button.onclick = hiddenTextByButton;
}
