/* eslint-disable no-unused-vars */
import { RouterProvider } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter } from "react-router-dom";
import Forgetpass from "./features/Authentication/forget-pass/Forgetpass";
import Login from "./features/Authentication/Login/Login";
import Register from "./features/Authentication/Register/Register";
import Resetpass from "./features/Authentication/Reset-pass/Resetpass";
import Vertify from "./features/Authentication/vertify-account/vertify";
// import Categoriesdata from "";
import Dashboard from "./features/Dashboard/Dashboard";
import Recipedata from "./features/Recipes/RecipeDate/Recipedata";
import Recipelist from "./features/Recipes/RecipeList/Recipelist";
import Authlayout from "./shared/Authlayout/Authlayout";
import Masterlayout from "./shared/MasterLayout/Masterlayout";
import Notfound from "./shared/Notfound/Notfound";
import UserList from "./features/user/UserList";
import ProtectRoute from "./shared/ProtectRoute/ProtectRoute";
import { AppFoodProvider } from "./context/AppFoodProvider";
import Categorieslist from "./features/Catagories/categoriesList/Categorieslist";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
function App() {
  const [loginData, setLoginData] = useState(() => {
    let Token = localStorage.getItem("token");
    return Token ? jwtDecode(Token) : null;
  });
  const SaveLoginData = () => {
    const data = localStorage.getItem("token");
    const loginDataDecode = jwtDecode(data);
    console.log(loginDataDecode);
    setLoginData(loginDataDecode);
  };
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      SaveLoginData();
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authlayout />,
      errorElement: <Notfound />,
      children: [
        { index: "*", element: <Login saveLoginData={SaveLoginData} /> },
        { path: "login", element: <Login saveLoginData={SaveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <Forgetpass /> },
        { path: "reset-pass", element: <Resetpass /> },
        { path: "vertify-account", element: <Vertify /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectRoute loginData={loginData}>
          <Masterlayout logininData={loginData} />
        </ProtectRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <Recipelist /> },
        { path: "recipes/new-recipe", element: <Recipedata /> },
        { path: "recipes/:recipeId", element: <Recipedata /> },
        { path: "categories", element: <Categorieslist /> },
        // { path: "categories-data", element: <Categoriesdata /> },
        { path: "user", element: <UserList /> },
      ],
    },
  ]);
  return (
    <>
      <AppFoodProvider>
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
      </AppFoodProvider>
    </>
  );
}

export default App;
