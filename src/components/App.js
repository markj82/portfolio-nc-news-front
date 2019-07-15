import React from 'react';
import '../styles/App.css';
import Navbar from './Navbar'
import { Router } from '@reach/router'
import Home from './Home';
import Articles from './Articles'
// import FullOneArticle from './FullOneArticle';


function App() {
  return (
    <div className="main-app">
      <Navbar />
      <Router>
        <Home path="/"/>
        <Articles path="/articles" />
        {/* <FullOneArticle path="/articles/:id"/> */}
      </Router>
    </div>
  );
}

export default App;