import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";
import "./register.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../components/img/IMG_20240219_090620519_HDR.jpg";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
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
      setValues({ email: "", password: "", name: "", phone: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <Layout>
      <div className="rgwrapper">
        <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
          <h1>Register</h1>

          <div className="input-box">
            <input
              onChange={(e) => onChange(e)}
              type="text"
              value={values.name}
              id="name"
              name="name"
              placeholder="Name"
              required
            />
          </div>

          <div className="input-box">
            <input
              onChange={(e) => onChange(e)}
              type="text"
              value={values.phone}
              id="phone"
              name="phone"
              placeholder="Phone"
              required
            />
          </div>

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
          </div>

          <div className="error" style={{ color: "red", margin: "20px 20px" }}>
            {error}
          </div>
          <div
            className="error"
            style={{ color: "green", margin: "20px 20px" }}
          >
            {success}
          </div>
          <center class="bttn">
            <button type="submit" className="regbutton">
              Submit
            </button>
          </center>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
