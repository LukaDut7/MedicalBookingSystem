import './Navbar.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import ProfileCard from '../ProfileCard/ProfileCard';
function Navbar(){
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
      const storedName = sessionStorage.getItem('name');
        const storedEmail = sessionStorage.getItem('email');
        const storedPhone = sessionStorage.getItem('phone');
        
        if (storedEmail) {
            setIsLoggedIn(true);
            const extractedUsername = storedEmail.split('@')[0];
            setUsername(extractedUsername);
            setName(storedName || 'User');
            setEmail(storedEmail);
            setPhone(storedPhone || 'N/A');
        }
    }, []);
return (
    <div>
        <nav>
            <div className="nav_logo">
                <a href="/">
                StayHealthy<i class="fas fa-clinic-medical" />
                </a>
            </div>
            
             <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                   <Link to="/">Home</Link>
                </li>
                <li className="link">
                   <Link to="/instant-consultation">Instant Consultation</Link>
                </li>
                <li className="link">
                    <a href="#">Health Blog</a>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                {isLoggedIn?(
          <>
            <li className="link" onClick={handleDropdown}>
                <a><b>Welcome, {username}!</b>
                <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                            <li><Link to="/profile-card">Your Profile</Link></li>
                            <li><Link to="/reports">Your Reports</Link></li>
                </ul>
                </a>
            </li>
            <li className="link">
              <button className="btn btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
            
          </>
        ) : (
          <>
                <li className="link">
                    <Link to="/signup">
                        <button className="btn btn1">Sign Up</button>
                    </Link>
                </li>
                <li className="link">
                    <Link to="/login">
                        <button className="btn btn1">Log In</button>
                    </Link>
                </li>
            </>)}
            </ul> 
        </nav>
    </div>
);
}
export default Navbar;
