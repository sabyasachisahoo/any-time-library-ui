import React from 'react';
import {Link} from 'react-router-dom';
import ReactAux from '../../hoc/ReactAux';

import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  let token = localStorage.getItem('token');
  let role = localStorage.getItem('role');
  
  return (
    <nav className={drawerClasses}>
      <ul>
      { 
                    !token ? 
                    <ReactAux>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ReactAux> : null
                  }
                  { 
                    (token && role === 'USER') ? 
                    <ReactAux className="">
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/issuedbooks">Issued Books</Link>
                        </li>
                    </ReactAux> : null
                  }
                  { 
                    (token && role === 'ADMIN') ? 
                    <ReactAux>
                        <li>
                            <Link  to="/admin/bookdetails">All Books</Link>
                        </li>
                        <li>
                            <Link  to="/issuedbooks">Issued Books</Link>
                        </li>
                        <li>
                            <Link to="/userinfo">User Details</Link>
                        </li>
                    </ReactAux> : null
                  }
                  {
                      token ? 
                        <li>
                            <Link to='/login' onClick={props.logout}>Logout</Link>
                        </li>
                    :null
                  }

      </ul>
    </nav>
  );
};

export default sideDrawer;