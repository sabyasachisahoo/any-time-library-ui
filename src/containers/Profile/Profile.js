import React,{Component} from 'react';
import axios from '../../axios';
import './Profile.css';
class Profile extends Component{

    state = {
        user:[],
        users:[]
    }
    
    getUsername(){
    return localStorage.getItem('username');
    }
    
    componentDidMount() {  
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        //get all users details for Admin
        axios.get('/profile')
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch((error) => {
          throw error;
        });

        //get single user details for User Login
        
        // axios.get('/profile/'+username)
        // .then(res => {
        //   this.setState({ user: res.data });
        //   console.log(this.state.user);
        // })
        // .catch((error) => {
        //   throw error;
        // });
    }

    updateUserHandler(id) {
         axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.put('/profile/'+id)
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch((error) => {
          throw error;
        });
    }

    removeUserHandler(id) {
         axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.delete('/profile/'+id)
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch((error) => {
          throw error;
        });
    }

    render(){
       let role = localStorage.getItem('role');
      
        //get single user details for User Login
        let username = this.getUsername();

        return(
        
               <div className="container">
                   {
                   (role === 'USER') ?
                    <div className="jumbotron">
                        <h1> Welcome, {username}</h1>
                    </div> :
                    null
                   }

                   {
                   (role === 'ADMIN') ?
                    <div>
                    <div className="jumbotron">
                        <h1> Welcome, {username}</h1>
                    </div>
                    {
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(user =>
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.role}</td>
                                            <td><button onClick={() => this.updateUserHandler(user._id)}>Edit</button></td>
                                            <td><button onClick={() => this.removeUserHandler(user._id)}>Delete</button></td>
                                        </tr>
                                    )}
                                </tbody>
                        </table>
                       
                    }
                    </div> :
                    null
                   }
               </div>
               
        )
    }    
}

export default Profile
