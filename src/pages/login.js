import { useState } from "react";
import { onLogin } from "../api/auth";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";
import logo from "../components/img/IMG_20240219_090620519_HDR.jpg";
import Button from "@mui/material/Button";
import { NavLink, Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <Layout>
      <div className="body">
        {/* <img src={logo} className="img2 col-1" alt="Background-Pic" /> */}

        <div className="wrapper col-2">
          <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
            <h1>Login</h1>

            <div className=" input-box">
              {/* <label htmlFor="email" className="form-label">
              Email address
            </label> */}
              <input
                onChange={(e) => onChange(e)}
                type="email"
                id="email"
                name="email"
                value={values.email}
                placeholder="Email ID"
                required
              />
              <FaUser className="icon" />
            </div>

            <div className="input-box">
              <input
                onChange={(e) => onChange(e)}
                type="password"
                value={values.password}
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <FaLock className="icon" />
            </div>

            <div
              className="error"
              style={{ color: "red", margin: "20px 20px" }}
            >
              {error}
            </div>

            <button type="submit" className="button">
              Submit
            </button>
            <span></span>
            <Link to="/forgotpassword">
              <button className="button2">Forgot Password</button>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
