/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { createContext, useContext, useEffect, useState } from "react";
import { CATEGORY_URL, TAG_URL, USER_URLS } from "../services/Api/APiconfig";
import { PrivateaxiosInstances } from "../services/Api/ApInstance";
import { jwtDecode } from "jwt-decode";
import usePagination from "../hooks/usePagination";
const AppContext = createContext();
function AppFoodProvider({ children }) {
  const [loginData, setLoginData] = useState(() => {
    let Token = localStorage.getItem("token");
    return Token ? jwtDecode(Token) : null;
  });
  const [imageuser, setImageuser] = useState(null);
  const [tagslist, settagslist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setgroups] = useState();
  const [searchName, setSearchName] = useState("");
  const [categories, setCategories] = useState([]);
  const {
    TotalofPages,
    getTotalofPages,
    currentPage,
    setcurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = usePagination();
  const SaveLoginData = () => {
    const data = localStorage.getItem("token");
    if (data) {
      const loginDataDecode = jwtDecode(data);
      setLoginData(loginDataDecode);
    }
  };
  async function getAllCategories(pageSize, pageNumber, name) {
    setIsLoading(true);
    try {
      const response = await PrivateaxiosInstances.get(
        CATEGORY_URL.GET_CATOGERY,
        {
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            name: name,
          },
        }
      );
      setCategories(response.data.data);
      getTotalofPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllCategories(6, currentPage + 1, searchName);
  }, [currentPage, searchName]);
  const refreshCategories = () => {
    getAllCategories(6, currentPage + 1, searchName);
  };
  async function getAllTags() {
    try {
      const res = await PrivateaxiosInstances.get(TAG_URL.GET_ALL_TAG);
      settagslist(res?.data);
    } catch (error) {
      console.log(error || "Faild to get data");
    }
  }
  const getCurrentUser = async () => {
    try {
      const response = await PrivateaxiosInstances.get(
        USER_URLS.GET_CURRENT_USER
      );
      setCurrentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      SaveLoginData();
      getCurrentUser();
    }
  }, []);
  useEffect(() => {
    getCurrentUser();
  }, [loginData]);
  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <AppContext.Provider
      value={{
        loginData,
        SaveLoginData,
        setLoginData,
        isLoading,
        getTotalofPages,
        tagslist,
        categories,
        searchName,
        setSearchName,
        refreshCategories,
        getAllCategories,
        getAllTags,
        currentPage,
        TotalofPages,
        setcurrentPage,
        ShowNextButton,
        ShowPrevButton,
        imageuser,
        setImageuser,
        groups,
        getCurrentUser,
        setgroups,
        currentUser,
        setCurrentUser,
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
