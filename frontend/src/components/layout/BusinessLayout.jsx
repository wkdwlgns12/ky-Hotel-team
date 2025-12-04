import { Outlet } from "react-router-dom";
import BusinessHeader from "./BusinessHeader"; //  교체됨
import BusinessSidebar from "./BusinessSidebar";
import "../../styles/index.scss";

const BusinessLayout = () => {
  return (
    <div className="admin-layout">
      <BusinessSidebar />
      <div className="admin-main">
        <BusinessHeader /> 
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BusinessLayout;