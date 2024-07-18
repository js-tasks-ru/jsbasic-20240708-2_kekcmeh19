function checkSpam(str) {
  // ваш код...
  let checkStr = str.toLowerCase();
  return(
    checkStr.includes('xxx') ||
    checkStr.includes('1xbet')
  )
}
