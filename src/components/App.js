import React from 'react';
import '../styles/App.css';
import { Router } from '@reach/router'
import Articles from './Articles'
import FullOneArticle from './FullOneArticle';
import ControlPanel from '../components/ControlPanel'



class App extends React.Component {

  state = {
    loggedInUser: 'jessjelly'
  }

  handleLogInLogOut = () => {

  }

  render() {
    return (
      <div className="main-app">
        <ControlPanel user={this.state.loggedInUser}/>
        {/* <Navbar user={this.state.loggedInUser}/> */}
        <Router>
          <Articles path="/" />
          <Articles path="/author/:author" />
          <Articles path="/topic/:topic" />
          <FullOneArticle path="/articles/:id" user={this.state.loggedInUser}/>
        </Router>
      </div>
    );
  }
  
}

export default App;