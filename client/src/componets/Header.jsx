import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export function Header() {
  const { loginStatus, updateEmail, updateUsername, updateLoginStatus, updateRole} = useContext(GlobalContext);
  const navigate = useNavigate();

  function logOut() {
    fetch('http://localhost:3001/api/logout', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }, 
      credentials: 'include',
    })
    .then(() => {
      updateLoginStatus(false);
      updateEmail('');
      updateUsername('');
      updateRole('');
      navigate('/');
    })
    .catch(console.error)
  }

  const publicLinks = <>
  <li className="nav-item"><Link to="/login" className="nav-link link-body-emphasis px-2">Login</Link></li>
  <li className="nav-item"><Link to="/register" className="nav-link link-body-emphasis px-2">Register</Link></li>
</>

const authLinks = <>
    <li className="nav-item"><Link to="/dashboard" className="nav-link link-body-emphasis px-2">Dashboard</Link></li>
    <li className="nav-item"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
</>

    return (
        <nav className="navbar navbar-expand-lg d-flex flex-wrap bg-primary" data-bs-theme="dark">
          <div className="container">
            <ul className='nav me-auto'>
              <li className="nav-item"><Link to="/" className="nav-link link-body-emphasis px-2 active" aria-current="page">Cars</Link></li>
            </ul>
            <ul className='nav'>
            {loginStatus ? authLinks : publicLinks}
            </ul>
            </div>
      </nav>
    )
}