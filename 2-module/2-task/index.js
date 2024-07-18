function isEmpty(obj) {
  // ваш код...
  let props = [];

  for (key in obj) {
    props.push(key);
  }

  return !Boolean(props.length);
}
