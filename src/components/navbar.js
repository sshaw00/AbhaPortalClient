import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo from "../components/img/logo-new-draft.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import crudData from "../config/apiService";

import "./nav.css";

import { useDispatch } from "react-redux";

import { unauthenticateUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await crudData("/logout", "GET", "", "authEngine");

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <header>
      <nav className="navbar bg-light">
        <img src={logo} alt="logo" className="logo" />

        {isAuth ? (
          <div>
            <Link to="/dashboard">
              <div className="btn">
                <Button variant="outlined" className="">
                  Dashboard
                </Button>
              </div>
            </Link>
            <div className="btn">
              <Button variant="outlined" color="error" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <div className="btn">
                <Button variant="outlined" className="btn1">
                  Login
                </Button>
              </div>
            </Link>

            <Link to="/register">
              <div className="btn">
                <Button variant="outlined" className="btn1">
                  Register
                </Button>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
