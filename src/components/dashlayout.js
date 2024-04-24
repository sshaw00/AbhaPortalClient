import DashNav from "./dashnav";

const DashLayout = ({ children }) => {
  return (
    <div>
      <DashNav />
      <div className="container">{children}</div>
    </div>
  );
};

export default DashLayout;
