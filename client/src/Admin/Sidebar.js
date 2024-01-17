import React, { useContext } from 'react';
import {  FaUser, FaCog, FaArrowRight, FaSignOutAlt, FaBell, FaSearch, FaCoffee } from 'react-icons/fa'; // Import your desired icons
import {  BsPeople, BsGear } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { Link }from "react-router-dom";

import "./Dashboard.css";

import { SidebarContext } from '../lib/sidebarConext';

const sidebarItems = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: AiOutlineHome,
  },
  {
    name: "App",
    to: "/#app",
    icon: BsPeople,
  },
  {
    name: "Settings",
    to: "/mails",
    icon: BsGear,
  },
  {
    name: "Contact",
    to: "/contact",
    icon: TiContacts,
  },
];

const Sidebar = () => {
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <aside className={` ${isCollapsed ? 'sidebar': 'active_sidebar'}`} data-collapse={isCollapsed}>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, to, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link `}
                  to={to}
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
