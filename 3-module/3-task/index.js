function camelize(str) {
  // ваш код...
  let words = str.split('-');
  let camelWords = [words[0]];

  for (let i = 1; i < words.length; i++) {
    let camelWord = words[i].slice(0, 1).toUpperCase() + words[i].slice(1);
    camelWords.push(camelWord);
  }

  return (camelWords.join(''));
}
