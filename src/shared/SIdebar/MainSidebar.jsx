/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import icon from "../../assets/images/siderbaricon.png";
import Home from "../../assets/images/Home.png";
import recipe from "../../assets/images/recipe.png";
import User from "../../assets/images/User.png";
import Profile from "../../assets/images/profile-svgrepo-com.png";
import Categories from "../../assets/images/Categories.png";
import Fav from "../../assets/images/🦆 icon _Heart_.png";
import changepassword from "../../assets/images/changepassword.png";
import logeouticon from "../../assets/images/logo-out.png";
import { toast } from "react-toastify";
import { useFoodApp } from "../../context/AppFoodProvider";
export default function MainSidebar({ setIsPopupVisible }) {
  const { usergroup } = useFoodApp();
  const [isCollapse, setCollapse] = useState(false);
  const location = useLocation();
  const navgate = useNavigate();
  function toggleCollapse() {
    setCollapse(!isCollapse);
  }
  function logeout() {
    localStorage.removeItem("token");
    toast.info("loge out Succeclly");
    navgate("/login");
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapse}>
        <Menu>
          <MenuItem
            onClick={toggleCollapse}
            className={`pt-4 mb-5 loge-li  ${isCollapse ? "ps-0" : "ps-3"}`}
            icon={<img className="sidebar-loge" src={icon} />}
          ></MenuItem>
          <MenuItem
            active={location.pathname === "/dashboard"}
            icon={<img className="sidebar-loge" src={Home} />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            active={location.pathname === "/dashboard/Profile"}
            icon={
              <img
                className="sidebar-loge"
                style={{ maxWidth: 40 }}
                src={Profile}
              />
            }
            component={<Link to="/dashboard/Profile" />}
          >
            Profile
          </MenuItem>
          {usergroup !== "SystemUser" ? (
            <MenuItem
              active={location.pathname === "/dashboard/user"}
              icon={<img className="sidebar-loge" src={User} />}
              component={<Link to="/dashboard/user" />}
            >
              User
            </MenuItem>
          ) : (
            ""
          )}

          <MenuItem
            active={location.pathname === "/dashboard/recipes"}
            icon={<img className="sidebar-loge" src={recipe} />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          {usergroup !== "SystemUser" ? (
            <MenuItem
              active={location.pathname === "/dashboard/categories"}
              icon={<img className="sidebar-loge" src={Categories} />}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          ) : (
            ""
          )}
          {usergroup === "SystemUser" ? (
            <MenuItem
              active={location.pathname === "/dashboard/Favorites"}
              icon={<img className="sidebar-loge" src={Fav} />}
              component={<Link to="/dashboard/Favorites" />}
            >
              Favorites
            </MenuItem>
          ) : (
            ""
          )}
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
