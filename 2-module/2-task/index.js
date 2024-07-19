function isEmpty(obj) {
  // ваш код...
  let prop = 0;

  for (key in obj) {
    prop = key;
    break;
  }

  return !Boolean(prop);
}
