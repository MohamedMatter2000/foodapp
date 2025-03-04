/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/images/siderbaricon.png";
import Home from "../../assets/images/Home.png";
import recipe from "../../assets/images/recipe.png";
import User from "../../assets/images/User.png";
import Categories from "../../assets/images/Categories.png";
import changepassword from "../../assets/images/changepassword.png";
import logeouticon from "../../assets/images/logo-out.png";
import { toast } from "react-toastify";
export default function MainSidebar({ setIsPopupVisible }) {
  const [isCollapse, setCollapse] = useState(false);
  const navgate = useNavigate();
  function toggleCollapse() {
    setCollapse(!isCollapse);
  }
  function logeout() {
    localStorage.removeItem("token");
    toast.info("loge out Succeclly");
    navgate("/login");
  }
  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapse}>
        <Menu
          menuItemStyles={{
            background: "red",
          }}
        >
          <MenuItem
            onClick={toggleCollapse}
            className={`pt-4 mb-5 loge-li  ${isCollapse ? "ps-0" : "ps-3"}`}
            icon={<img className="sidebar-loge" src={icon} />}
          ></MenuItem>
          <MenuItem
            icon={<img className="sidebar-loge" src={Home} />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<img className="sidebar-loge" src={User} />}
            component={<Link to="/dashboard/user" />}
          >
            User
          </MenuItem>
          <MenuItem
            icon={<img className="sidebar-loge" src={recipe} />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={<img className="sidebar-loge" src={Categories} />}
            component={<Link to="/dashboard/categories" />}
          >
            Categories
          </MenuItem>
          <MenuItem
            onClick={() => setIsPopupVisible(true)}
            icon={<img className="sidebar-loge" src={changepassword} />}
          >
            Change Password
          </MenuItem>
          <MenuItem
            onClick={logeout}
            icon={<img className="sidebar-loge" src={logeouticon} />}
          >
            Logeout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
