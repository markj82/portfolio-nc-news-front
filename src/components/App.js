import React from 'react';
import '../styles/App.css';
import { Router } from '@reach/router'
import Articles from './Articles'
import FullOneArticle from './FullOneArticle';
import ControlPanel from '../components/ControlPanel';
import NotFound from './NotFound'


class App extends React.Component {

  state = {
    loggedInUser: {
      username: "jessjelly",
      avatar_url: "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
      name: "Tom Tickle"
      }
    
  }

  render() {
    return (
      <div className="main-app">
        <ControlPanel user={this.state.loggedInUser}/>
        <Router>
          <NotFound default />
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