import { RouterProvider } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter } from "react-router-dom";
import Login from "./features/Authentication/Login/Login";
import Register from "./features/Authentication/Register/Register";
import Forgetpass from "./features/Authentication/ForgetPassword/ForgetPassword";
import Resetpass from "./features/Authentication/ResetPassword/Resetpass";
import Vertify from "./features/Authentication/VertifyAccount/Vertify";
import Recipedata from "./features/Recipes/RecipeDate/Recipedata";
import Recipelist from "./features/Recipes/RecipeList/Recipelist";
import Authlayout from "./shared/Authlayout/Authlayout";
import Masterlayout from "./shared/MasterLayout/Masterlayout";
import Notfound from "./shared/Notfound/Notfound";
import UserList from "./features/user/UserList/UserList";
import ProtectRoute from "./shared/ProtectRoute/ProtectRoute";
import { AppFoodProvider } from "./context/AppFoodProvider";
import Categorieslist from "./features/Catagories/categoriesList/Categorieslist";
import Favorites from "./features/Favorite/Favorites";
import Profile from "./features/Profile/Profile";
import Dashboard from "./features/Dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // staleTime: 0,
      },
    },
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authlayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "ForgetPassword", element: <Forgetpass /> },
        { path: "ResetPassword", element: <Resetpass /> },
        { path: "VertifyAccount", element: <Vertify /> },
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
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}

export default App;
