import React from 'react';
import '../styles/Navbar.css'
import { Link } from '@reach/router';
import '../styles/Navbar.css'
import logo2 from '../img/logo2.png'

const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link to="/" className="item link"><img className="logo" src={logo2}/></Link>
            
                <div class="dropdown item link">
                <button class="dropbtn">View By Topics</button>
                    <div class="dropdown-content">
                        <Link to="/topic/coding">Coding</Link>
                        <Link to="/topic/cooking">Cooking</Link>
                        <Link to="/topic/football">Football</Link>
                    </div>
                </div>
            

            <label>
                Sort:
                <select>
                    <option>Date Created</option>
                    <option>Comment Count</option>
                    <option>Votes</option>
                </select>
                <Link to="/articles" className="item link">Articles</Link>
            </label>
            
            <Link to="/articles" className="item link">Test 1</Link>
            <Link to="/articles" className="item link">Logged in as {props.user}</Link>
           
        </div>
        
     );
}
 
export default Navbar;