const myLibrary = [];
let addBookFormOpen = false;
const read = 'Read it'
const unread = 'Not read yet'

function Book(title, author, pages, read=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = read;

  this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${this.haveRead ? 'read' : 'not read yet'}`;
  };
}

Book.prototype.toggleReadStatus = function() {
  this.haveRead = !this.haveRead;
}

function makeLibrary() {
  const table_headers = ['Title', 'Author', 'Pages', 'Has been read', 'Delete'];
  tableHeaders(table_headers);
  myLibrary.forEach((book, index) => {
    addBookToLibrary(book, index);
  });
}

function tableHeaders(headers) {
  const library = document.getElementById('book_library');
  const tableHeaders = document.createElement('tr');
  headers.forEach((header) =>  {
    const headerTag = document.createElement('th');
    headerTag.textContent = header;
    tableHeaders.appendChild(headerTag);
  })
  library.appendChild(tableHeaders);
}

function addBookToLibrary (book, index) {
  const library = document.getElementById('book_library');
  const tableRow = document.createElement('tr');
  Object.keys(book).forEach((key) => {
    const column = document.createElement('td');
    if (key === 'info') { return }
    if (key === 'haveRead') {
      const btn = document.createElement('button');
      btn.id = `bkbtn${index}`;
      btn.textContent = book[key] ? read : unread;
      btn.addEventListener('click', () => {
        updateRead(btn.id, index);
      })
      column.appendChild(btn);
    } else {
      column.textContent = book[key];
    }
    tableRow.appendChild(column);
  })
  const column = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.id = index;
  deleteBtn.textContent = "Remove book";
  deleteBtn.addEventListener('click', () => {
    deleteBook(index);
  })
  column.appendChild(deleteBtn)
  tableRow.appendChild(column)
  library.appendChild(tableRow);
}

function updateRead(button, index) {
  myLibrary[index].toggleReadStatus();
  const btn = document.getElementById(button);
  btn.textContent = myLibrary[index].haveRead ? read : unread;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  remakeLibrary();
}

function remakeLibrary() {
  const library = document.getElementById('book_library');
  while (library.lastChild) {
    library.removeChild(library.lastChild);
  }
  makeLibrary()
}

function addBookButton() {
  const btn = document.querySelector('#add_book');
  btn.addEventListener('click', () => {
    if (!addBookFormOpen) {
      form();
    } else {
      removeForm();
    }
  })
}

function switchButtonState() {
  button = document.querySelector('#add_book');
  addBookFormOpen = !addBookFormOpen;
  button.textContent = addBookFormOpen ? 'Cancel' : 'Add book';
}

function form() {
  switchButtonState();
  const form = document.getElementById('book_form');
  const newBook = new Book();
  Object.keys(newBook).forEach((key) => {
    if (key === 'info') { return }
    const lineBeak1 = document.createElement('br');
    const lineBeak2 = document.createElement('br');
    const label = document.createElement('label');
    label.setAttribute('for', key);
    label.textContent = key;
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', key);
    input.setAttribute('name', key);
    form.appendChild(label);
    form.appendChild(lineBeak1);
    form.appendChild(input);
    form.appendChild(lineBeak2);
  })
  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add to library';
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formInfo = document.forms[0].elements;
    submitBook(formInfo, newBook);  
  })
  form.appendChild(addBtn);
}

function submitBook(formInfo, book) {
  Object.keys(book).forEach((field) => {
    if (field === 'info') { return }
    book[field] = formInfo[field].value;
  })
  myLibrary.push(book);
  addBookToLibrary(book, myLibrary.length -1)
  removeForm();
}

function removeForm() {
  const table = document.getElementById('book_form');
  while (table.lastChild) {
    table.removeChild(table.lastChild);
  }
  switchButtonState();
}

function populateLibraryArray() {
  myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
  myLibrary.push(new Book("Ulysses", "	James Joyce", 730, false));
  myLibrary.push(new Book("Don Quixote", "Miguel de Cervantes", 863, false))
}

function main() {
  populateLibraryArray();
  makeLibrary();
  addBookButton();
}

main();