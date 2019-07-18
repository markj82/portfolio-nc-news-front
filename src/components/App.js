import React from 'react';
import '../styles/App.css';
import { Router } from '@reach/router'
import Articles from './Articles'
import FullOneArticle from './FullOneArticle';
import ControlPanel from '../components/ControlPanel';
import NotFound from './NotFound'
// import ErrorPage from './ErrorPage';

class App extends React.Component {

  state = {
    loggedInUser: {
      username: "happyamy2016",
      avatar_url: "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
      name: "Tom Tickle"
      }
    
  }

  users: {
    username: "",
    username: "grumpy19",
    username: "jessjelly",
    username: "tickle122",
    username: "weegembump",
    username: "happyamy2016",
  }

  handleLogInLogOut = () => {

  }

  render() {
    return (
      <div className="main-app">
        <ControlPanel user={this.state.loggedInUser}/>
        {/* <Navbar user={this.state.loggedInUser}/> */}
        <Router>
          <NotFound default />
          {/* <ErrorPage default/> */}
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