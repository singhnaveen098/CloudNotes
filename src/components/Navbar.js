import React from 'react'
import {Link, useLocation, useHistory} from "react-router-dom";

function Navbar() {
    let location = useLocation();
    let history = useHistory()
    const handlelogout = ()=>{
        localStorage.removeItem('token')
        history.push('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="mr-2 font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:text-transparent" to="/">CloudNotes</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"? "active":""} font-bold`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"? "active":""} font-bold`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-outline-primary mx-2 font-bold" to="/login" role="button">Login</Link>
                            <Link className="btn btn-outline-primary mx-2 font-bold" to="/signup" role="button">Sign up</Link>
                        </form>:<button className="btn btn-outline-primary mx-2 font-bold" onClick={handlelogout}>LogOut</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
