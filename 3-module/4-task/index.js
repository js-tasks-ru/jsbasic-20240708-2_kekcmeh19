function showSalary(users, age) {
  // ваш код...
  let usersSalary = [];
  
  users.forEach(item => {
    if (item.age <= age) {
      usersSalary.push(item.name + ', ' + item.balance);
    }
  })

  return (usersSalary.join('\n'))
}
