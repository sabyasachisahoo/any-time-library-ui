import React from 'react';
import {Route,Switch} from 'react-router-dom';

import Home from '../../components/Home/Home';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import AddBooks from '../../containers/Library/AddBooks/AddBooks';
import IssueBooks from '../../containers/Library/IssueBooks/IssueBooks'; 
import Profile from '../../containers/Profile/Profile';
import Library from '../../containers/Library/Library';


const routes = () =>{
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/books" component={Library} />
            <Route exact path="/issue" component={Library} />
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/issuedbooks" component={IssueBooks} /> 
            <Route exact path="/admin/addbooks" component={AddBooks} />
            <Route exact path="/admin/bookdetails" component={Library} />      
        </Switch>
    )
}

export default routes