import { useContext } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdMessage } from "react-icons/md";
import { FaBell, FaSearch } from "react-icons/fa";
import { BsFillCupFill } from "react-icons/bs";

import "./AdminComponents/DashboardComponents.css";
import "./Dashboard.css";

import { SidebarContext } from "../lib/sidebarConext";
import DashboardComponents from "./AdminComponents/DashboardCards";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="layout">
      <div className="adminNav">
        <button className={` ${isCollapsed ? 'btn': 'activeBtn'}`} onClick={toggleSidebarcollapse}>
          {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </button>
        <div className="nav__logo">
          <BsFillCupFill className='cup' size={48} color='#2831ce' />
          <p className={` ${isCollapsed ? 'nav__logo-name': 'activenav__logo-name'}`}>Brewtopia</p>
        </div>
        <div className="nav__container">
            <div className="search__div">
              <input className='input-search' type='text' placeholder='Search here...' />
              <FaSearch className="search_icon" size={18} />
            </div>
            <div className="nav__items__container">
              < MdMessage className="nav__items" size={40} color="blue"/>
              <FaBell className="nav__items" size={40} color="pink"/>
              <div className=" hello_admin" >
               <p>Hello, {"admin"}</p>
                <img
                src="/favicon.jpg"
                alt="img"
                />
              </div>
            </div>
        </div>
      </div>

      <main className="layout__main-content">
        <Sidebar />
        <div  className="dashboard__content__container">
          <DashboardComponents />
        </div>
      </main>
    </div>
  ); 
};

export default Dashboard;
