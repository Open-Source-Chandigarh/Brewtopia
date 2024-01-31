import React, { useContext, useEffect, useRef } from 'react';
// import {  FaUser, FaCog, FaArrowRight, FaSignOutAlt, FaBell, FaSearch, FaCoffee } from 'react-icons/fa'; // Import your desired icons
import {  BsPeople, BsGear } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { Link }from "react-router-dom";

import "./Dashboard.css";

import useScreenSize from '../lib/useScreenSize';
import { SidebarContext } from '../context/sidebarContext';

const sidebarItems = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: AiOutlineHome,
  },
  {
    name: "App",
    to: "/admin/dashboard",
    icon: BsPeople,
  },
  {
    name: "Settings",
    to: "/admin/dashboard",
    icon: BsGear,
  },
  {
    name: "Contact",
    to: "/admin/dashboard",
    icon: TiContacts,
  },
];

const Sidebar = () => {
  const {width} = useScreenSize()
  const { isCollapsed, toggleTab, toggleSidebarcollapse } = useContext(SidebarContext);
  const ref = useRef(null);

  useEffect(() => {  // useEffect for Outside click detecting
    const handler = (event) => {
      if (width< 940 && !isCollapsed && ref.current && !ref.current.contains(event.target)) {
        toggleSidebarcollapse()
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
    };
  }, [isCollapsed]);

  const handleToggles =(name) => {
    toggleTab(name) 
    if(width < 940){
    toggleSidebarcollapse()
    }
  }

  return (
    <div className="sidebar__wrapper" ref={ref}>
      <aside className={` ${isCollapsed ? 'sidebar': 'active_sidebar'}`} data-collapse={isCollapsed}>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, to, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link `}
                  to={to}
                  onClick={() =>handleToggles(name)}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
