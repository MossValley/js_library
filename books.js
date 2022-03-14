const myLibrary = [];


function Book(title, author, pages, read=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = read;

  this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${this.haveRead ? 'read' : 'not read yet'}`;
  };
}
