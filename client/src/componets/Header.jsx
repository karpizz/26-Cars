import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export function Header() {
  const { loginStatus, updateEmail, updateUsername, updateLoginStatus, updateRole } = useContext(GlobalContext);
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
    <li className="nav-item"><Link to="/login" className="nav-link link-body-emphasis px-2 text-white">Login</Link></li>
    <li className="nav-item"><Link to="/register" className="nav-link link-body-emphasis px-2 text-white">Register</Link></li>
  </>

  const authLinks = <>
    <li className="nav-item"><Link to="/dashboard" className="nav-link link-body-emphasis px-2 text-white">Dashboard</Link></li>
    <li className="nav-item"><button onClick={logOut} className="nav-link link-body-emphasis px-2 text-white">Logout</button></li>
  </>

  return (
    <header className="p-3 bg-info">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between">
          <ul className="nav col-12 col-lg-auto col-sm-auto me-lg-auto mb-2 mb-md-0">
            <li className="nav-item"><Link to="/" className="nav-link link-body-emphasis px-2 text-white" aria-current="page">Home</Link></li>
            <li><Link to="/" className="nav-link px-2 link-body-emphasis text-white">Inventory</Link></li>
          </ul>
          <div>
            <ul className="nav text-end">
              {loginStatus ? authLinks : publicLinks}
            </ul>
          </div>
          {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
          </form> */}
        </div>
      </div>
    </header>
  )
}