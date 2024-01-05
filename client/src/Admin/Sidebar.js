import React, { useState } from 'react';
import { FaUser, FaCog, FaArrowRight, FaSignOutAlt, FaBell, FaSearch } from 'react-icons/fa'; // Import your desired icons
import "./Sidebar.css";
import { IoReorderThree } from "react-icons/io5";
import { MdDashboard, MdMessage } from "react-icons/md";
import { BsFillCupFill } from "react-icons/bs";

export default function Sidebar({ children }) {
  const [isCompact, setIsCompact] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  //toggle sidebar
  const toggleCompactMode = () => {
    setIsCompact(!isCompact);
  };


  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <>
      <div className='outer'>
        <div className={`sidebar ${isCompact ? 'compact' : ''}`}>
          <ul>
            <li>
              <BsFillCupFill size={30} />
              {!isCompact && <span><a href="/">Brewtopia</a></span>}
            </li>
            <li>
              <MdDashboard />
              {!isCompact && <span>Dashboard</span>}
            </li>
            <li className='dropdown-li' onClick={toggleUserDropdown}>
              <FaUser />
              {!isCompact && (
                <>
                  <span>Apps</span>
                </>
              )}
            </li>
            <li>
              <FaCog />
              {!isCompact && <span>Settings</span>}
            </li>
            <li>
              <FaSignOutAlt />
              {!isCompact && <span>Charts</span>}
            </li>
          </ul>
        </div>

        <div className='inner'>
          {/* navbar for admin  */}
          <div className='navbar'>
            <div className='nav-div'>
              <div className="toggle-button" onClick={toggleCompactMode}>
                {isCompact ? <FaArrowRight size={25} /> : <IoReorderThree size={35} />}
              </div>
              <div className='div-search'>
                <input className='input-search' type='text' placeholder='Search here...' />
                <div className='search-btn'> <FaSearch size={25} /></div>
              </div> </div>
            <div className='side-div'>
              <MdMessage size={25} />
              <div className='notif-div'>
                <FaBell size={25} /></div>
              <button className='admin-btn'>Hello Admin </button>
            </div>
          </div>
          
          {/* to render childs based on route */}
          {children}
        </div>
      </div>
    </>
  );
};
