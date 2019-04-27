import React,{Component} from 'react';
import axios from '../../axios';
import './Register.css';

class Register extends Component {
    state ={
        username:'',
        password:''
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
    
      onSubmit = (e) => {
        e.preventDefault();
    
        const { username, password } = this.state;
    
        axios.post('/register', {username,password})
          .then((result) => {
            this.props.history.push("/login")
          });
      }
        
    render(){
    const { username, password } = this.state;
        return (
                <form onSubmit={this.onSubmit}>
                    <div className="container">
                        <h2>Register</h2>
                        <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={this.onChange} required/>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                    </div>
                </form>
        )
    }
}

export default Register;