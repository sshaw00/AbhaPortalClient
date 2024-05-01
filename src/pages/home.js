import Layout from "../components/layout";
import logo from "../components/img/IMG_20240219_090620519_HDR.jpg";
import "./login.css";

const Home = () => {
  return (
    <Layout>
      <img src={logo} className="img2 col-1" alt="Background-Pic" />
    </Layout>
  );
};

export default Home;
