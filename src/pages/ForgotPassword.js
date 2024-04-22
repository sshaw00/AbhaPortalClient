import { useState } from "react";
import { onForgotPassword } from "../api/auth";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";
import logo from "../components/img/IMG_20240219_090620519_HDR.jpg";
import Button from "@mui/material/Button";
import { NavLink, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await onForgotPassword(values);

    try {
      setError("");
      setSuccess(data.message);
      setValues({ email: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };
  return (
    <Layout>
      <div className="fpwrapper col-2">
        <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
          <center>
            {" "}
            <h2>Forgot Password</h2>
          </center>

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

          <div className="error" style={{ color: "red", margin: "0px 20px" }}>
            {error}
          </div>
          <div
            className="error"
            style={{ color: "green", margin: "20px 20px" }}
          >
            {success}
          </div>

          <button type="submit" className="regbutton">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
