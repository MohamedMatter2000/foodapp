import { RouterProvider } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter } from "react-router-dom";
import Forgetpass from "./features/Authentication/forget-pass/Forgetpass";
import Login from "./features/Authentication/Login/Login";
import Register from "./features/Authentication/Register/Register";
import Resetpass from "./features/Authentication/Reset-pass/Resetpass";
import Vertify from "./features/Authentication/vertify-account/Vertify";
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
import Favorites from "./features/Favorite/Favorites";
import Profile from "./features/Profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authlayout />,
      errorElement: <Notfound />,
      children: [
        { index: "*", element: <Login /> },
        { path: "login", element: <Login /> },
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
          <Masterlayout />
        </ProtectRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <Recipelist /> },
        { path: "recipes/new-recipe", element: <Recipedata /> },
        { path: "recipes/:recipeId", element: <Recipedata /> },
        { path: "categories", element: <Categorieslist /> },
        { path: "user", element: <UserList /> },
        { path: "Favorites", element: <Favorites /> },
        { path: "Profile", element: <Profile /> },
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
