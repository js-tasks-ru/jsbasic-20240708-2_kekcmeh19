function factorial(n) {
  // ваш код...
  if( n === 0 || n === 1) {
    return 1;
  } else {
    let fact = n;

    for(let i = 1; i < n; i++) {
      fact = fact * (n - i);
    }
  
    return fact;
  }
}
