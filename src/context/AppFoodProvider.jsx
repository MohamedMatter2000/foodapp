/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import {
  CATEGORY_URL,
  RECEIPE_URL,
  USER_URLS,
} from "../services/Api/APiconfig";
import { PrivateaxiosInstances } from "../services/Api/ApInstance";
const AppContext = createContext();
function AppFoodProvider({ children }) {
  const [recipeId, setrecipeId] = useState(0);
  const [recipesylist, setrecipeslist] = useState([]);
  const [categorylist, setcategorylist] = useState([]);
  const [Users, setUsers] = useState([]);
  const [userId, setuserId] = useState(0);
  const [chooseDelete, setChooseDelete] = useState("categery");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categeryId, setcategeryId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [logininData, setlogininData] = useState(() => {
    let Token = localStorage.getItem("token");
    return Token ? jwtDecode(Token) : null;
  });
  const closePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  async function getAllCategries() {
    setIsLoading(true);
    try {
      const response = await PrivateaxiosInstances.get(
        CATEGORY_URL.GET_CATOGERY
      );
      setcategorylist(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function AddandEditcategry(data, Mode, id) {
    if (Mode === "Update") {
      try {
        const response = await PrivateaxiosInstances.put(
          CATEGORY_URL.EDIT_CATOGERY(id),
          data
        );
        getAllCategries();
        toast.info(" Edit Category Succeclly");
        console.log(response);
      } catch (errors) {
        toast.error(errors.response.data.message);
      }
    } else {
      try {
        const response = await PrivateaxiosInstances.post(
          CATEGORY_URL.ADD_CATOGERY,
          data
        );
        getAllCategries();
        toast.success(" Add Category Succeclly");
        console.log(response);
      } catch (errors) {
        toast.error(errors.response.data.message);
      }
    }
  }
  async function deletcategry(id) {
    console.log(id);
    try {
      const response = await PrivateaxiosInstances.delete(
        CATEGORY_URL.DELETE_CATOGERY(categeryId)
      );
      toast.success(" Delete Category Succeclly");
      getAllCategries();
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllRecipe() {
    setIsLoading(true);
    try {
      const response = await PrivateaxiosInstances.get(RECEIPE_URL.GET_RECIPE);
      setrecipeslist(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deletrecipes(id) {
    console.log(id);
    try {
      const response = await PrivateaxiosInstances.delete(
        RECEIPE_URL.DELETE_RECIPE(id)
      );
      toast.success(" Delete Recipe Succeclly");
      getAllRecipe();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUsers() {
    setIsLoading(true);
    try {
      const res = await PrivateaxiosInstances.get(
        USER_URLS.GET_ALL_USER(10, 1)
      );
      console.log(res?.data?.data);
      setUsers(res?.data?.data);
    } catch (error) {
      setUsers([]);
      console.log(error || "Faild to get data");
    } finally {
      setIsLoading(false);
    }
  }
  const deletetUsers = async (id) => {
    console.log(id);
    setIsLoading(true);
    try {
      const res = await PrivateaxiosInstances.delete(USER_URLS.DELETE_USER(id));
      console.log(res?.data?.data);
      toast.success(" The user has been deleted successfully");
      getUsers();
    } catch (error) {
      console.log(error || "Faild to get data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getAllCategries();
  }, []);
  useEffect(() => {
    getAllRecipe();
  }, []);
  return (
    <AppContext.Provider
      value={{
        categeryId,
        categorylist,
        isLoading,
        closePopup,
        setcategeryId,
        deletcategry,
        isPopupVisible,
        setIsPopupVisible,
        logininData,
        AddandEditcategry,
        getUsers,
        Users,
        chooseDelete,
        setChooseDelete,
        deletetUsers,
        userId,
        setuserId,
        recipesylist,
        setrecipeslist,
        deletrecipes,
        recipeId,
        setrecipeId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
function useFoodApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("FoodAppContext was used outside of the FoodProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { AppFoodProvider, useFoodApp };
