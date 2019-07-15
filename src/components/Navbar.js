import React from 'react';
import '../styles/Navbar.css'
import { Link } from '@reach/router';
import '../styles/Navbar.css'
import logo from '../img/north-logo.png'
import logo2 from '../img/logo2.png'

const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link to="/" className="item link"><img className="logo" src={logo2}/></Link>
            <Link to="/articles" className="item link">Articles</Link>
            <Link to="/articles" className="item link">Test 1</Link>
            <Link to="/articles" className="item link">Test 2</Link>
            <Link to="/articles" className="item link">Test 3</Link>
        </div>
        
     );
}
 
export default Navbar;