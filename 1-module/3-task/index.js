function ucFirst(str) {
  // ваш код...
  if( str === '') {
    return str;
  } else {
    let firstChar = str.slice(0, 1).toUpperCase();
    let strWithoutFirstChar = str.slice(1);
    return( firstChar + strWithoutFirstChar)
  }
}
