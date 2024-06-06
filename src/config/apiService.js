import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { config } from "./config";
import axios from "axios";
const moment = require("moment");

const newAccessToken = async () => {
  try {
    const rxauth = localStorage.getItem("rxauth");
    if (rxauth) {
      const response = await axios.get(`${config.authUrl}refreshAccessToken`, {
        headers: {
          Authorization: rxauth,
        },
        data: { rxauth },
      });

      if (response.status !== 200) {
        Cookies.remove("x-auth");
        localStorage.removeItem("rxauth");
        location.reload();
        return false;
      }

      return response.data.token;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const tokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const expTime = moment.unix(decodedToken.exp);
  return moment(expTime).isBefore(moment());
};

const crudData = async (apiEndpoint, method, payload, engine) => {
  const baseAddressTypes = {
    authEngine: config.engine.auth,
    studentEngine: config.engine.student,
  };
  const baseAddress =
    (engine && baseAddressTypes[engine]) || config.baseAddress;

  let finalUrl =
    engine && baseAddressTypes[engine]
      ? config.serverURL + baseAddress + apiEndpoint
      : baseAddress + apiEndpoint;
  // let accessToken = Cookies.get('x-auth');
  try {
    // if (!accessToken || tokenExpired(accessToken)) {
    //     accessToken = await newAccessToken();
    //     if (!accessToken) {
    //         localStorage.removeItem('rxauth');
    //         window.location.replace('/');
    //         Cookies.remove('x-auth');
    //     }
    // }
    // if (accessToken) {
    // const headers = { Authorization: `Bearer ${accessToken}` };
    // const headers = {};
    // if (payload instanceof FormData) {
    //     headers.Accept = 'application/json';
    // } else {
    //     headers['Content-Type'] = 'application/json';
    // }
    // console.log(finalUrl, method);
    const response = await axios({
      method,
      url: finalUrl,
      data: payload,
    });

    let responseData;
    try {
      responseData = JSON.parse(response.data);
    } catch (error) {
      responseData = response.data;
    }

    if (response.status !== 200) {
      throw new Error(responseData);
    }
    return { status: response.status, message: responseData };
    // }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error(err.response.data.message);
    } else if (
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors.length > 0
    ) {
      throw new Error(err.response.data.errors[0].msg);
    } else {
      throw new Error("Internal server error");
    }
  }
};

export default crudData;
