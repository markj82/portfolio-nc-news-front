import React from 'react';
import '../styles/ControlPanel.css';
import { Link } from '@reach/router';
import logo2 from '../img/logo2.png'

const ControlPanel = (props) => {
    return (
        <div className="control-panel-main">
            <Link to="/" className="item link"><img className="logo" src={logo2}/></Link>
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
            <div className="topics-control-panel item">
                
            </div>
            <div className="login-user item">
                Login / Sign Up
            </div>
            <div className="logged-in item">
                Logged in as {props.user}
            </div>
        </div>
    );
}
 
export default ControlPanel;