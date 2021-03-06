import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import Search from './Search';
import './App.css';

class BooksApp extends React.Component {
  max_result = 25;

  state = {
    books: [],
      searchBooks: []
  }

  componentDidMount() {
          this.getBooks();
      }

    getBooks() {
          BooksAPI.getAll().then((books) => {
              this.setState({books});
          });
      }

      getShelfBooks(shelfName){
          return this.state.books.filter((b) => b.shelf === shelfName)
      }

      changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            book.shelf = newShelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }));
        });
    };

    updateQuery = (query) => {
          if(query){
              BooksAPI.search(query, this.max_result).then((books) => {
                  if(books.length){
                      books.forEach((book, index) => {
                          let myBook = this.state.books.find((b) => b.id === book.id);
                          book.shelf = myBook ? myBook.shelf : 'none';
                          books[index] = book;
                      });

                      this.setState({
                          searchBooks: books
                      });
                  }
              });
              } else {
              this.setState({
                  searchBooks: []
              });
          }
      };

  render() {


    return (
      <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>My Books Collection</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    title="Currently Reading"
                                    books={this.getShelfBooks("currentlyReading")}
                                    changeShelf={this.changeShelf}
                                />
                                <BookShelf
                                    title="Want to Read"
                                    books={this.getShelfBooks("wantToRead")}
                                    changeShelf={this.changeShelf}
                                />
                                <BookShelf
                                    title="Read"
                                    books={this.getShelfBooks("read")}
                                    changeShelf={this.changeShelf}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={({ history }) => (
                    <Search
                        books={this.state.searchBooks}
                       updateQuery={this.updateQuery}
                        changeShelf={this.changeShelf}
                    />
                )}/>
            </div>
    )
  }
}

export default BooksApp
