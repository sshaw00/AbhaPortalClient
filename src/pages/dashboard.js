import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import Layout from "../components/layout";
import DashLayout from "../components/dashlayout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import "./dash.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(true);

  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <DashLayout>
      <h1>Loading...</h1>
    </DashLayout>
  ) : (
    <div>
      <DashLayout>
        <h1>Dashboard</h1>
        <h2>{protectedData}</h2>
      </DashLayout>
    </div>
  );
};

export default Dashboard;
