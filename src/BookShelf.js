import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
static propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};

  render() {
    return(
      <div className="bookShelf">
        <h2 className="bookShelf-title">{this.props.title}</h2>
        <div className="bookShelf-books">
          <ol className="books-grid">
              {this.props.books.map((book) => (
                      <li key={book.id} className="contact-list-item">
                          <Book
                              book={book}
                              changeShelf={this.props.changeShelf}/>
                      </li>
                  ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
