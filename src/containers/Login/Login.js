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
                <form className="box" onSubmit={this.onSubmit}>
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={this.onChange} required/>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                    <button type="submit">Login</button>
                    <p>
                      <Link to="/register" style={{textDecoration:"none",color:"#3498db"}}>Not a member? </Link>
                    </p>
                  </form>    
        )
    }
}

export default Login