import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Routes from './components/Routes/Routes';
import ReactAux from './hoc/ReactAux';
import libraryImage from './assets/images/Library.jpg';

class App extends Component {

  state = {
    sideDrawerOpen:false
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  logout = () =>{
      localStorage.removeItem('token');
      localStorage.removeItem('role')
      localStorage.removeItem('username');
      window.location.reload();
  }
  
  componentDidMount() {

  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    const routes = Routes();

    return (
      <ReactAux>
      <div id="imageBackground">
        <img src={libraryImage} className="stretch" alt=""/>
      </div>
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} logout={this.logout}/>
        <SideDrawer show={this.state.sideDrawerOpen} logout={this.logout}/>
        {backdrop}
        {routes}
      </div>
      </ReactAux>
    );
  }
}

export default App;
