import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../components/img/2.png";
import logo2 from "../components/img/3.png";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a class="navbar-brand" href="#">
          <img
            src={logo2}
            alt="Logo"
            height="100px"

            // class="d-inline-block align-text-top"
          />
          <img
            src={logo}
            alt="Logo"
            height="100px"
            // class="d-inline-block align-text-top"
          />
        </a>
        <div>
          <NavLink to="/">
            <span className="navbar-brand mb-0 h1">Home</span>
          </NavLink>
        </div>

        {isAuth ? (
          <div>
            <NavLink to="/dashboard" className="mx-3">
              <span>Dashboard</span>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/login">
              <span>Login</span>
            </NavLink>

            <NavLink to="/register" className="mx-3">
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
