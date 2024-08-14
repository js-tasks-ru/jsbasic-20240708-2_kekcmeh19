/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.renderTable();
  }

  createTableHead() {
    return (
      `<th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th>`
    )
  }

  createTableBody() {
    this.rowsHTML = this.rows
      .map(({ name, age, salary, city }) => {
        return `<tr><td>${name}</td><td>${age}</td><td>${salary}</td><td>${city}</td><td><button onclick="this.closest('tr').remove()">X</button></td></tr>`
      })
      .join('');
    
      return this.rowsHTML;
  }

  renderTable() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `<thead><tr>${this.createTableHead()}</tr></thead><tbody>${this.createTableBody()}</tbody>`;

    return this.elem;
  }
}
