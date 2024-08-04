function highlight(table) {
  // ваш код...
  let tbody = table.children[1];

  // проставление класса 'available/unavailable' или атрибута 'hidden'
  for (let i = 0; i < tbody.rows.length; i++) {
    let cell = tbody.rows[i].cells[3];

    if (cell.dataset.available == 'true') {
      tbody.rows[i].classList.add('available');
    } else if (cell.dataset.available == 'false') {
      tbody.rows[i].classList.add('unavailable');
    } else {
      tbody.rows[i].hidden = true;
    }
  }

  //проставление 'male/female'
  for (let i = 0; i < tbody.rows.length; i++) {
    let cell = tbody.rows[i].cells[2];

    if (cell.innerHTML == 'm') {
      tbody.rows[i].classList.add('male');
    } else if (cell.innerHTML == 'f') {
      tbody.rows[i].classList.add('female');
    }
  }

  //проставление стиля
  for (let i = 0; i < tbody.rows.length; i++) {
    let cell = tbody.rows[i].cells[1];

    if (Number(cell.innerHTML) < 18) {
      tbody.rows[i].style.textDecoration = 'line-through';
    }
  }
}
