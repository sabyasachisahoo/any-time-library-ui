import React,{Component} from 'react';
import axios from '../../../axios';

class AddBooks extends Component {
    state ={
        isbn: '',
        title: '',
        author: '',
        description: '',
        price:'',
        published_date: '',
        publisher: '',
        category:''
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            isbn:this.state.isbn,
            title:this.state.title,
            author:this.state.author,
            description:this.state.description,
            price:this.state.price,
            published_date:this.state.published_date,
            publisher:this.state.publisher,
            category:this.state.category
        }
        var headers = {'Content-Type': 'application/json'};
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('/book/books',data,headers)
          .then((result) => {
            //localStorage.setItem('token', result.data.token);
              //console.log(result);
            this.props.history.push("/admin/bookdetails")
          });
      }
    render(){
        return(
            <div className="container">
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <h2 className="form-signin-heading">Add books</h2>
                <div className="form-group">
                    <label htmlFor="inputISBN" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="ISBN" name="isbn" value={this.state.isbn} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputTitle" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAuthor" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="Author" name="author" value={this.state.author} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputDescription" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="Description" name="description" value={this.state.description} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPrice" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="Price" name="price" value={this.state.price} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPublished_date" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="Published_date" name="published_date" value={this.state.published_date} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPublisher" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="Publisher" name="publisher" value={this.state.publisher} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputCategory" className="control-label"></label>
                    <input type="text" className="form-control" placeholder="Category" name="category" value={this.state.category} onChange={this.onChange} required/>
                </div>
                <div style={{width: 360}} >
                    <button type="submit">Add</button>
                </div> 
            </form>
        </div>
        )
    }
}

export default AddBooks;