import React from "react";
import { Tabs, Tab } from "@mui/material";
import "styles/navbar.css";
import winepalLogo from "assets/images/winepal_logo.png";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Hamburger from "components/hamburger";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
const TabsMui = styled(Tab)({
  "&.Mui-selected": {
    color: "#DE0941",
  },
  color: "#232323",
});

export default function NavBar() {
  let start = parseInt(localStorage.getItem("link-count"));

  const [value, setValue] = useState(start);

  const setLink = () => {
    let link_count = parseInt(localStorage.getItem("link-count"));
    setValue(link_count);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("link-count", newValue);
    setLink();
  };

  return (
    <div className="main-navbar">
      <div className="logo">
        <img src={winepalLogo} alt="winepalLogo" className="winepal-logo" />
      </div>
      <div className="navlink">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: "transparent" },
          }}
        >
          <NavLink
            exact
            to="/"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <TabsMui label="Accueil" className="nav-link" />
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <TabsMui label="Connexion" className="nav-link" />
          </NavLink>

          <NavLink
            to="/wine"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <TabsMui label="Vins" className="nav-link" />
          </NavLink>

          <NavLink
            to="/pal"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <TabsMui label="Plats" className="nav-link" />
          </NavLink>

          <Outlet />
        </Tabs>
      </div>
      <div className="hamburger">
        <Hamburger />
      </div>
    </div>
  );
}
