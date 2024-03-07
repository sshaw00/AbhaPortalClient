import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../components/img/IMG_20240219_090620519_HDR.jpg";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);

      setError("");
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <Layout>
      <img src={logo} className="img2" />
      <div className="wrapper">
        <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
          <h1>Register</h1>

          <div className="input-box">
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

          <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
          <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
