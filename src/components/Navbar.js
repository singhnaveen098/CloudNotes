import React from 'react'
import {Link, useLocation, useHistory} from "react-router-dom";

function Navbar(props) {
    const host = ""
    let location = useLocation();
    let history = useHistory()
    const handlelogout = ()=>{
        localStorage.removeItem('token')
        history.push('/login')
    }
    const handledeleteuser = async () => {
        const response = await fetch(`${host}/api/auth/deleteuser`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        localStorage.removeItem('token')
        history.push('/login')
        props.showalert('Account Deleted successfully', 'success')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="mr-2 font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:text-transparent" to="/">CloudNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
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
                        </form>:<div className="dropdown">
                            <span className="dropdown-toggle text-white font-bold" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-user mx-2"></i>Profile
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                <li><button className="dropdown-item" onClick={handledeleteuser}>Delete Account<i class="mx-2 fa fa-trash-o"></i></button></li>
                                <li><button className="dropdown-item" onClick={handlelogout}>LogOut<i class="mx-2 fa fa-sign-out"></i></button></li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
