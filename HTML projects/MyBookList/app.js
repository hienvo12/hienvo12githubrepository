// Book CLasss: represents Book
class Book{
  constructor(title,author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//UI class: handle ui task
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book){
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  static deleteBook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }
  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
  static showAlert(message, className){
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      //vanish after timeout
      setTimeout(() => document.querySelector('.alert').remove(), 2500);
    }
}
//store class: storage
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach((book, index) =>{
        if(book.isbn === isbn){
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
  }
}
//Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: add a book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
  //prevent  actual submit
  e.preventDefault();
  //get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  //validate
  if(title === '' || author === '' || isbn === ''){
    UI.showAlert('fill in forms', 'danger');
  } else{
    //instantiatebook
    const book = new Book(title,author,isbn);
    //
    console.log(book);
    //add book to UI
    UI.addBookToList(book);
    UI.showAlert('Book Added!', 'success');
    //add book to Store
    Store.addBook(book);
    //clear fields
    UI.clearFields();
  }
});
//Event: remove a book
document.querySelector('#book-list').addEventListener('click', (e)=>
  {
    UI.deleteBook(e.target);
    UI.showAlert('Book Removed.', 'info');
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  }
);
