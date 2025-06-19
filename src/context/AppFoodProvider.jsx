/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { createContext, useContext, useEffect, useState } from "react";
import {
  CATEGORY_URL,
  RECEIPE_URL,
  TAG_URL,
  USER_RECEIPE_URL,
  USER_URLS,
} from "../services/Api/APiconfig";
import { PrivateaxiosInstances } from "../services/Api/ApInstance";
import { jwtDecode } from "jwt-decode";
const AppContext = createContext();
function AppFoodProvider({ children }) {
  const [loginData, setLoginData] = useState(() => {
    let Token = localStorage.getItem("token");
    return Token ? jwtDecode(Token) : null;
  });
  const [recipeId, setrecipeId] = useState(0);
  const [imageuser, setImageuser] = useState(null);
  const [recipesylist, setrecipeslist] = useState([]);
  const [tagslist, settagslist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [TotalofPages, setTotalOFPages] = useState(0);
  const [TotalofPagesRecipe, setTotalOFPagesRecipe] = useState(0);
  const [CategorySelected, setCategorySelected] = useState("");
  const [SearchQueryRecipe, setSearchQueryRecipe] = useState("");
  const [SearchQueryUser, setSearchQueryUser] = useState("");
  const [groups, setgroups] = useState();
  const [TagSelected, setTagSelected] = useState("");
  const [currentPage, setcurrentPage] = useState(0);
  const [currentPagerecipe, setcurrentPagerecipe] = useState(0);
  const ShowNextButton = currentPage !== TotalofPages - 1;
  const ShowPrevButton = currentPage !== 0;
  const ShowNextButtonrecipe = currentPagerecipe !== TotalofPagesRecipe - 1;
  const ShowPrevButtonrecipe = currentPagerecipe !== 0;
  const SaveLoginData = () => {
    const data = localStorage.getItem("token");
    if (data) {
      const loginDataDecode = jwtDecode(data);
      setLoginData(loginDataDecode);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
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
  async function getAllTags() {
    try {
      const res = await PrivateaxiosInstances.get(TAG_URL.GET_ALL_TAG);
      console.log(res?.data);
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
  async function getAllRecipe(pageSize, pageNumber, name, tagId, categoryId) {
    setIsLoading(true);
    try {
      const response = await PrivateaxiosInstances.get(RECEIPE_URL.GET_RECIPE, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      });
      setrecipeslist(response?.data?.data);
      setTotalOFPagesRecipe(response?.data?.totalNumberOfPages);
      console.log(TotalofPagesRecipe);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
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
  useEffect(() => {
    getAllRecipe(
      10,
      currentPagerecipe + 1,
      SearchQueryRecipe,
      TagSelected,
      CategorySelected
    );
  }, [currentPagerecipe, SearchQueryRecipe, TagSelected, CategorySelected]);
  return (
    <AppContext.Provider
      value={{
        loginData,
        SaveLoginData,
        setLoginData,
        isLoading,
        closePopup,
        isPopupVisible,
        setIsPopupVisible,
        // deletetUsers,
        recipesylist,
        setrecipeslist,
        deletrecipes,
        recipeId,
        setrecipeId,
        TotalofPages,
        setTotalOFPages,
        setcurrentPage,
        ShowNextButton,
        ShowPrevButton,
        TotalofPagesRecipe,
        setTotalOFPagesRecipe,
        currentPagerecipe,
        setcurrentPagerecipe,
        ShowPrevButtonrecipe,
        ShowNextButtonrecipe,
        tagslist,
        setTagSelected,
        setSearchQueryRecipe,
        setCategorySelected,
        getAllTags,
        getAllRecipe,
        setSearchQueryUser,
        SearchQueryUser,
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
