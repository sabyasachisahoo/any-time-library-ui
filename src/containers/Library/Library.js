import React, { Component } from 'react';
import './Library.css';
import axios from '../../axios';
import {Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
// import Pagination from 'react-bootstrap/Pagination';
import PropTypes from "prop-types";
import SearchBook from './SearchBook/SearchBook';

class Library extends Component {

  state = {
    books:[],
    isBookIssued: false,
    readCount:0
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.setAuthorization();
    axios.get('/books')
      .then(res => {
        this.setState({ books: res.data });
      })
      .catch((error) => {
        if(error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  issueBookHandler(id,title,author){
    this.setAuthorization();

    var data = {
      username: this.getUsername(),
      bookId: id,
      title: title,
      author: author
    };

    var headers = {'Content-Type': 'application/json'};

    axios.post('/issue', data, headers)
          .then((result) => {
            if(result){
              this.setState({isBookIssued:true})
              this.props.history.push("/issuedbooks");
            }  
          }).catch((error) => { 
            if(error) throw error;
            prompt('book cannot be issued now');
          })
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  setAuthorization() {
    return  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  }

  // renderPagination() {
  //   let items = [];
  //   for (let number = 1; number <= 2; number++) {
  //     items.push(
  //      <Pagination.Item key={number}>{number}</Pagination.Item>
  //     );
  //   }
  //   return (
  //     <Pagination size="sm">{items}</Pagination>
  //   );
  // }

  myCallback = (dataFromChild) => {
      this.setState({ books : dataFromChild})
  }
  
  render() {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
  
    return (
      <div className="container">
          <h3> BOOK CATALOG </h3>  
        <div className="contain">
              {  (token && role === 'ADMIN') ? <Link className="disableLine" to='/admin/addbooks'>Add books</Link> :null   } 
              <SearchBook callbackFromParent={this.myCallback}/>
              <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { 
                  this.state.books.map((book) => {
                  return (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.category}</td>
                    <td>{
                        (token && role === 'USER') ? 
                          <span><button className="libBtn"
                              onClick={() => this.issueBookHandler(book._id,book.title,book.author)}>Issue</button>
                          </span>
                        :null
                        }
                    </td>
                    <td>
                        {
                        (token && role === 'ADMIN') ? 
                        <span><button className="libBtn"
                              onClick={() => this.deleteBookHandler(book._id)}>Delete</button>
                        </span>
                        :null
                        }
                    </td>
                  </tr>
                  );
                })
                }
                
              </tbody>
            </Table>
          </div>       
      </div>   
    );
  }
}

export default Library;
