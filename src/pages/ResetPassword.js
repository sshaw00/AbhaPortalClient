import { useState } from "react";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";
import logo from "../components/img/IMG_20240219_090620519_HDR.jpg";
import Button from "@mui/material/Button";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { id, token } = useParams();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/resetpassword/${id}/${token}`,
        values
      );

      if (data.success) {
        alert("Password Changed Successfully");
        navigate("/login");
      }
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
            <h2>Reset Password</h2>
          </center>

          <div className=" input-box">
            {/* <label htmlFor="email" className="form-label">
              Email address
            </label> */}
            <input
              onChange={(e) => onChange(e)}
              type="password"
              id="password"
              name="password"
              value={values.password}
              placeholder="New Password"
              required
            />
            <FaLock className="icon" />
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
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
