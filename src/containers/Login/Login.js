import React,{Component} from 'react';
import axios from '../../axios';
import {Link} from 'react-router-dom';
import './Login.css';

class Login extends Component {

    state = {
        username:'',
        password:''
    }

    onChange = (event) => {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {username,password} = this.state;
        axios.post('/login', { username, password })
      .then((result) => {
            this.saveUserDetails(result.data);
        
            let role = result.data.user.role;

            if(role === 'ADMIN' ){
              this.props.history.push('/admin/bookdetails') 
            }
            if(role === 'USER'){
              this.props.history.push('/books')   
            }   
            window.location.reload();
      })
      .catch((error) => {
        if(error.status === 401) {
          alert('Wrong Username or Password')
        }else if(error.status === 404 || 200){
          alert('User not found')
        }
        throw error;
      });
    }

    saveUserDetails(data){
      localStorage.setItem('token', data.token);
      localStorage.setItem('role',data.user.role)
      localStorage.setItem('username',data.user.username)
    }
    render(){
        const { username, password } = this.state;
        return (
                <form onSubmit={this.onSubmit}>
                      <div className="container">
                        <h2>Login</h2>
                          <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={this.onChange} required/>
                          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                          <button className="btn btn-sm btn-primary btn-block" type="submit">Login</button>
                      
                        <p>
                          <Link to="/register" style={{textDecoration:"none"}}>Not a member? </Link>
                        </p>
                      </div>
                  </form>    
        )
    }
}

export default Login