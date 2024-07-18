function isEmpty(obj) {
  // ваш код...
  let props = [];

  for (key in obj) {
    props.push(key);
    if(props.length > 0) {
      break;
    }
  }

  return !Boolean(props.length);
}
