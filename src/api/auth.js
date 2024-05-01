import axios from "axios";
import { useState } from "react";

// const { SERVER_URL } = require("../constants/index");

const { SERVER_URL } = require("../constants/index");

axios.defaults.withCredentials = true;

// export async function onRegistration(registrationData) {
//   return await axios.post(
//     `http://localhost:8000/api/register`,
//     registrationData
//   );
// }
export async function onForgotPassword(forgotdata) {
  return await axios.post(
    "http://localhost:8000/api/forgotpassword",
    forgotdata
  );
}

export async function onLogout() {
  return await axios.get("http://localhost:8000/api/logout");
}

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:8000/api/protected");
}
