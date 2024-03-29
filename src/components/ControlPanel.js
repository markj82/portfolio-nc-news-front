import React from 'react';
import '../styles/ControlPanel.css';
import { Link } from '@reach/router';
import logo2 from '../img/logo2.png'

// article, section, header, footer, nav and figure

const ControlPanel = (props) => {
    return (
        <nav className="control-panel-main">
            <Link to="/" className="item link">   <img className="logo" alt="logo of northcoders" src={logo2}/>   </Link>
            <div className="topics-control-panel item">
            <div className="dropdown item link">
                <button className="dropbtn">View By Topics</button>
                    <div className="dropdown-content">
                        <Link to="/topic/coding">Coding</Link>
                        <Link to="/topic/cooking">Cooking</Link>
                        <Link to="/topic/football">Football</Link>
                    </div>
                </div>
            </div>
            <div className="logged-in item">
                Logged in as {props.user.username}
            </div>
            
        </nav>
    );
}
 
export default ControlPanel;