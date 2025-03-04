/* eslint-disable no-unused-vars */
import { RouterProvider } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter } from "react-router-dom";
import Forgetpass from "./Authentication/forget-pass/Forgetpass";
import Login from "./Authentication/Login/Login";
import Register from "./Authentication/Register/Register";
import Resetpass from "./Authentication/Reset-pass/Resetpass";
import Vertify from "./Authentication/vertify-account/vertify";
import Categoriesdata from "./Catagories/categoriesData/Categoriesdata";
import Categorieslist from "./Catagories/categoriesList/Categorieslist";
import Dashboard from "./Dashboard/Dashboard";
import Recipedata from "./Recipes/RecipeDate/Recipedata";
import Recipelist from "./Recipes/RecipeList/Recipelist";
import Authlayout from "./shared/Authlayout/Authlayout";
import Masterlayout from "./shared/MasterLayout/Masterlayout";
import Notfound from "./shared/Notfound/Notfound";
import UserList from "./user/UserList";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectRoute from "./shared/ProtectRoute/ProtectRoute";

function App() {
  const [logininData, setlogininData] = useState(null);
  function saveLoginData() {
    const endecodeToken = localStorage.getItem("token");
    const decodeToken = jwtDecode(endecodeToken);
    console.log(decodeToken);
    setlogininData(decodeToken);
  }
  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authlayout />,
      errorElement: <Notfound />,
      children: [
        { index: "*", element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <Forgetpass /> },
        { path: "reset-pass", element: <Resetpass /> },
        { path: "vertify-account", element: <Vertify /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectRoute>
          <Masterlayout logininData={logininData} />
        </ProtectRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <Recipelist /> },
        { path: "recipes-data", element: <Recipedata /> },
        { path: "categories", element: <Categorieslist /> },
        { path: "categories-data", element: <Categoriesdata /> },
        { path: "user", element: <UserList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
