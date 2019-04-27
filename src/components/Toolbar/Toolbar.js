import React,{Component}  from 'react';
import {Link} from 'react-router-dom';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import ReactAux from '../../hoc/ReactAux';

class Toolbar extends Component {

    render(){
        let token = localStorage.getItem('token');
        let role = localStorage.getItem('role');
        //let username = sessionStorage.getItem('username');

    return  (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={this.props.drawerClickHandler} />
                </div>
          <div>
                 <div><Link className="toolbar_header" to="/">Any Time Library</Link></div> 
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
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
                    <ReactAux>
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
                            <Link to="/admin/bookdetails">All Books</Link>
                        </li>
                        <li>
                            <Link to="/issuedbooks">Issued Books</Link>
                        </li>
                        <li>
                            <Link to="/profile">User Details</Link>
                        </li>
                    </ReactAux> : null
                  }
                  {
                      token ? 
                        <li>
                            <Link to='/' onClick={this.props.logout}>Logout</Link>
                        </li>
                    :null
                  }

              </ul>
          </div>
      </nav>
    </header>
    
    )
    }
} 

  
  export default Toolbar;