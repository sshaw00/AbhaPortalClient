import { useState } from "react";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";
import { Link } from "react-router-dom";
import crudData from "../config/apiService";
import logo from "../components/img/IMG_20240219_090620519_HDR.jpg";
import { useSnackbar } from "notistack";

const Login = () => {
  const dispatch = useDispatch();
  // swarup
  const {enqueueSnackbar} = useSnackbar()
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await crudData("/login", "POST", values, "authEngine");
      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
      //swarup
      enqueueSnackbar("Login Successful", { variant: "success" });
    } catch (error) {
      setError(error.message);
      enqueueSnackbar("Login Failed", { variant: "error" });
    }
  };

  return (
    <Layout>
      <div className="bd">
        <img src={logo} className="img2 col-1" alt="Background-Pic" />
        <div className="wrapper col-2">
          <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
            <h1>Login</h1>

            <div className=" input-box">
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

            <div className="error" style={{ color: "red", margin: "20px 0px" }}>
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
