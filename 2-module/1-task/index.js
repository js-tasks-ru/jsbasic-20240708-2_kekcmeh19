function sumSalary(salaries) {
  // ваш код...
  let sum = 0;

  for (key in salaries) {
    if (Number.isFinite(salaries[key])) {
      sum += salaries[key];
    }
  }

  return sum;
}
