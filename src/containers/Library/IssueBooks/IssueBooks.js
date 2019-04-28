import React, { Component } from 'react';
import ReactAux from '../../../hoc/ReactAux';
import axios from '../../../axios';
import moment from 'moment';
import Table from 'react-bootstrap/Table';

class IssueBook extends Component {

  state = {
    issuedbooks:[],
    userbooks:[]
  }

  componentDidMount() {
      this.getAllIssuedBooksForAdmin();
      this.getAllIssuedBooksByUser();
  }

  setAuthorization() {
    return axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  }

  //admin can see all issued books
  getAllIssuedBooksForAdmin() {
    this.setAuthorization();

    axios.get('/issuedbooks')
      .then(res => {
        this.setState({ issuedbooks: res.data });
      })
      .catch((error) => {
        if(error.status === 401) {
          this.props.history.push("/books");
        }
      });

  }

 //user can see all issued books by him/her
  getAllIssuedBooksByUser() {
      this.setAuthorization();

      let username = localStorage.getItem('username');
      axios.get('/issuedbooks/'+username)
      .then(res => {
        this.setState({ userbooks: res.data });
      })
      .catch((error) => {
        if(error.status === 401) {
          this.props.history.push("/books");
        }
        throw error;
      });
  }

   //renew book in issued book list
  renewBookHandler(id,issue_date,renew_date){
    this.setAuthorization();

    let current_date = new Date();
    issue_date = new Date(this.getFormatedDate(issue_date));
    renew_date = new Date(this.getFormatedDate(renew_date));
    let new_renew_date;

   if(current_date >= renew_date) {
        new_renew_date = this.addDays(current_date, 7);
        this.renewIssuedBook(id, new_renew_date);  
    }else if(current_date < renew_date) {
        let dayleft = renew_date - current_date 
        alert("Days left to renew this book"+ dayleft);
    }else if(issue_date < renew_date) {
        alert("Can't renew this book, as renew date is "+ renew_date);
    }else if(current_date.valueOf() === renew_date.valueOf()) {
        new_renew_date = this.addDays(current_date, 7);
        this.renewIssuedBook(id, new_renew_date);
        alert("Your book renew date is changed to "+ renew_date);
    }else{
      alert("Error While renewing the book");
    }
  }

  //remove book from issued list
  returnBookHandler(id,renew_date){
    this.setAuthorization();

    let current_date = new Date();
    renew_date = new Date(this.getFormatedDate(renew_date));

   if(current_date > renew_date) {
        alert("Retrun book with fine");
        this.returnIssuedBook(id);  
    }else if(current_date < renew_date) {
        alert("Please confirm you want to retun this book");
        this.returnIssuedBook(id);
    }else if(current_date.valueOf() ===  renew_date.valueOf()) {
        alert("thank you for returning book on time");
        this.returnIssuedBook(id);
    }else{
      alert("Error While returing the book");
    }
  }

    //renew book in issued book list
  renewIssuedBook(id, renew_date) {
    return axios.put(`https://cors-anywhere.herokuapp.com/issuedbooks/${id}`,renew_date )
      .then(res => {
        if(res.data && this.getRole() === 'USER') {
           this.setState({ userbooks: res.data });
          this.getAllIssuedBooksByUser();
        }
         if(res.data && this.getRole() === 'ADMIN') {
           this.setState({ issuedbooks: res.data });
          this.getAllIssuedBooksForAdmin();
        }
      })
      .catch((error) => {
        if(error.status === 401) {
          this.props.history.push("/books");
        }
      });
  }

  //remove book from issued list
  returnIssuedBook(id) {
    return axios.delete('/issuedbooks/'+id )
      .then(res => {
         if(res.data && this.getRole() === 'USER') {
           this.setState({ userbooks: res.data });
          this.getAllIssuedBooksByUser();
        }
         if(res.data && this.getRole() === 'ADMIN') {
           this.setState({ issuedbooks: res.data });
          this.getAllIssuedBooksForAdmin();
        }
      })
      .catch((error) => {
        if(error.status === 401) {
          this.props.history.push("/books");
        }
      });
  }

  getFormatedDate(data){
    let index = data.indexOf("T");
    return data.substring(0,index);
  }

  addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  render() {
    let role = this.getRole();
    //let username = this.props.match.params.username;
    return (  
      <ReactAux>
      {
       (role === 'ADMIN') ? 
       <div className="container">
       <div className="panel panel-default">
         <div className="panel-heading">
           <h1>
             ALL ISSUED BOOK CATALOG
           </h1>
         </div>
         <div className="panel-body">
           <div className="contain">
             <Table striped bordered hover responsive variant="dark">
             <thead>
               <tr>
                 <th>TITLE</th>
                 <th>AUTHOR</th>
                 <th>ISSUED TO </th>
                 <th>ISSUED DATE</th>
                 <th>RENEW DATE</th>
                  <th>ACTIONS</th>
               </tr>
             </thead>
             <tbody>
               {
                 this.state.issuedbooks.map(issuedbook =>
                 <tr key={issuedbook._id}>
                   <td>{issuedbook.bookTitle}</td>
                   <td>{issuedbook.bookAuthor}</td>
                    <td>{issuedbook.username}</td>
                   <td>{moment(issuedbook.issue_date).format('lll')}</td>
                   <td>{moment(issuedbook.renew_date).format('lll')}</td>
                    <td><button onClick={() => this.renewBookHandler(issuedbook._id,issuedbook.issue_date,issuedbook.renew_date)}>Renew</button></td>
                  <td><button onClick={() => this.returnBookHandler(issuedbook._id,issuedbook.renew_date)}>Retrun</button></td>
                 </tr>
               )
               }
             </tbody>
           </Table>
           </div>
         
         </div>
       </div>
       </div>
       
       : 
       <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">
            ISSUED BOOK CATALOG 
          </h1>
        </div>
        <div className="panel-body">
          <div className="contain">
             <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>AUTHOR</th>
                <th>ISSUED DATE</th>
                <th>RETURN/RENEW DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.userbooks.map(book =>
                <tr key={book._id}>
                  <td>{book.bookTitle}</td>
                  <td>{book.bookAuthor}</td>
                  <td>{moment(book.issue_date).format('lll')}</td>
                  <td>{moment(book.renew_date).format('lll')}</td>
                  <td><button onClick={() => this.renewBookHandler(book._id,book.issue_date,book.renew_date)}>Renew</button></td>
                  <td><button onClick={() => this.returnBookHandler(book._id,book.renew_date)}>Retrun</button></td>
                </tr>
              )
              }
            </tbody>
          </Table>
          </div>
        </div>
      </div>
      </div>
      }
      </ReactAux>
    );
  }
}

export default IssueBook;
