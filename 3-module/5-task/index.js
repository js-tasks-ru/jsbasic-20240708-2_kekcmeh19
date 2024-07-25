// function getMinMax(str) {
//   // ваш код...
//   let arr = str.split(' ');
//   let numbers = [];
//   let result = {};

//   arr.forEach(item => {
//     if (isFinite(item)) {
//       numbers.push(Number(item));
//     }
//   });

//   numbers.sort((a, b) => a - b);

//   result.min = numbers[0];
//   result.max = numbers.at(-1);

//   return result;
// }

function getMinMax(str) {
  let arr = str.split(' ');

  let result = arr.reduce((obj, current) => {
    if (isFinite(current)) {
      current = Number(current);

      if (current < obj.min) obj.min = current;
      
      if (current > obj.max) obj.max = current;
    }

    return obj;
  }, {min: Infinity, max: -Infinity});

  return result;
}