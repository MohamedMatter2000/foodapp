// import { useEffect, useState } from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import icon from "../../assets/images/siderbaricon.png";
// import Home from "../../assets/images/Home.png";
// import recipe from "../../assets/images/recipe.png";
// import User from "../../assets/images/User.png";
// import Profile from "../../assets/images/profile-svgrepo-com.png";
// import Categories from "../../assets/images/Categories.png";
// import Fav from "../../assets/images/🦆 icon _Heart_.png";
// import changepassword from "../../assets/images/changepassword.png";
// import logeouticon from "../../assets/images/logo-out.png";
// import { toast } from "react-toastify";
// import { useFoodApp } from "../../context/AppFoodProvider";
// import useModal from "../../hooks/useModal";
// import Changepassword from "../../features/Authentication/Changepassword/Changepassword";
// export default function MainSidebar() {
//   const { usergroup } = useFoodApp();
//   const { isOpen, closeModal, openModal } = useModal();
//   const [isCollapse, setCollapse] = useState(false);
//   const location = useLocation();
//   const navgate = useNavigate();
//   function toggleCollapse() {
//     setCollapse(!isCollapse);
//   }
//   function Change() {
//     console.log("dss");
//     openModal("ChangePassword");
//   }
//   function logeout() {
//     localStorage.removeItem("token");
//     toast.info("loge out Succeclly");
//     navgate("/login");
//   }
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         setCollapse(true);
//       } else {
//         setCollapse(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return (
//     <div className="sidebar-container">
//       <Sidebar collapsed={isCollapse}>
//         <Menu>
//           <MenuItem
//             onClick={toggleCollapse}
//             className={`pt-4 mb-5 loge-li ${isCollapse ? "ps-0" : "ps-3"}`}
//             icon={<img src={icon} />}
//           ></MenuItem>
//           <MenuItem
//             active={location.pathname === "/dashboard"}
//             icon={<img src={Home} />}
//             component={<Link to="/dashboard" />}
//           >
//             Home
//           </MenuItem>
//           <MenuItem
//             active={location.pathname === "/dashboard/Profile"}
//             icon={
//               <img
//                 className="sidebar-loge"
//                 style={{ maxWidth: 40 }}
//                 src={Profile}
//               />
//             }
//             component={<Link to="/dashboard/Profile" />}
//           >
//             Profile
//           </MenuItem>
//           {usergroup !== "SystemUser" && (
//             <MenuItem
//               active={location.pathname === "/dashboard/user"}
//               icon={<img src={User} />}
//               component={<Link to="/dashboard/user" />}
//             >
//               User
//             </MenuItem>
//           )}
//           <MenuItem
//             active={location.pathname === "/dashboard/recipes"}
//             icon={<img src={recipe} />}
//             component={<Link to="/dashboard/recipes" />}
//           >
//             Recipes
//           </MenuItem>
//           {usergroup !== "SystemUser" && (
//             <MenuItem
//               active={location.pathname === "/dashboard/categories"}
//               icon={<img src={Categories} />}
//               component={<Link to="/dashboard/categories" />}
//             >
//               Categories
//             </MenuItem>
//           )}
//           {usergroup === "SystemUser" && (
//             <MenuItem
//               active={location.pathname === "/dashboard/Favorites"}
//               icon={<img src={Fav} />}
//               component={<Link to="/dashboard/Favorites" />}
//             >
//               Favorites
//             </MenuItem>
//           )}
//           <MenuItem onClick={Change} icon={<img src={changepassword} />}>
//             Change Password
//           </MenuItem>
//           <MenuItem onClick={logeout} icon={<img src={logeouticon} />}>
//             Logeout
//           </MenuItem>
//         </Menu>
//       </Sidebar>
//       {isOpen("ChangePassword") && (
//         <Changepassword onHide={closeModal} show={isOpen("ChangePassword")} />
//       )}
//     </div>
//   );
// }
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
import Changepassword from "../../features/Authentication/Changepassword/Changepassword";
import useModal from "../../hooks/useModal";
export default function MainSidebar() {
  const { usergroup } = useFoodApp();
  const [isCollapse, setCollapse] = useState(false);
  const { isOpen, closeModal, openModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  function toggleCollapse() {
    setCollapse(!isCollapse);
  }
  function logout() {
    localStorage.removeItem("token");
    toast.info("Logged out successfully");
    navigate("/login");
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
            className={`pt-4 mb-5 loge-li ${isCollapse ? "ps-0" : "ps-3"}`}
            icon={<img src={icon} alt="Toggle" />}
          />
          <MenuItem
            active={location.pathname === "/dashboard"}
            icon={<img src={Home} alt="Home" />}
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
                alt="Profile"
              />
            }
            component={<Link to="/dashboard/Profile" />}
          >
            Profile
          </MenuItem>
          {usergroup !== "SystemUser" && (
            <MenuItem
              active={location.pathname === "/dashboard/user"}
              icon={<img src={User} alt="User" />}
              component={<Link to="/dashboard/user" />}
            >
              User
            </MenuItem>
          )}
          <MenuItem
            active={location.pathname === "/dashboard/recipes"}
            icon={<img src={recipe} alt="Recipes" />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          {usergroup !== "SystemUser" && (
            <MenuItem
              active={location.pathname === "/dashboard/categories"}
              icon={<img src={Categories} alt="Categories" />}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          )}
          {usergroup === "SystemUser" && (
            <MenuItem
              active={location.pathname === "/dashboard/Favorites"}
              icon={<img src={Fav} alt="Favorites" />}
              component={<Link to="/dashboard/Favorites" />}
            >
              Favorites
            </MenuItem>
          )}
          <MenuItem
            onClick={() => openModal("ChangePassword")}
            icon={<img src={changepassword} alt="Change Password" />}
          >
            Change Password
          </MenuItem>
          <MenuItem
            onClick={logout}
            icon={<img src={logeouticon} alt="Logout" />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      {isOpen("ChangePassword") && (
        <Changepassword onHide={closeModal} show={isOpen("ChangePassword")} />
      )}
    </div>
  );
}
