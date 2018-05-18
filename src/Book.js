import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ShelfManager from './ShelfManager';
import noCover from './icons/no-cover-image.png'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  };
  render(){
    const { book }= this.props;
    // add fallbacks for missing cover images and title
  const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover
  const title = book.title ? book.title : "No title available"

    return(
      <div className="book" id={book.id}>
          <div className="book-top">
              <div className="book-cover" style={{ backgroundImage: `url(${coverImg})`}}></div>
                <ShelfManager
                    book={book}
                    changeShelf={this.props.changeShelf}
                />
            </div>
            <div className="book-title">{title}</div>
            { /* Check for authors and render each on separate line if exist*/
              book.authors && book.authors.map((author, index) => (
                <div className="book-authors" key={index}>{author}</div>
            ))}
      </div>
    )
  }
}

export default Book;
