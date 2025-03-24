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
  const usergroup = loginData?.userGroup;
  const [recipeId, setrecipeId] = useState(0);
  const [imageuser, setImageuser] = useState(null);
  const [recipesylist, setrecipeslist] = useState([]);
  const [categorylist, setcategorylist] = useState([]);
  const [tagslist, settagslist] = useState([]);
  const [Allcategoryslistname, settAllcategoryslistname] = useState([]);
  const [Users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setuserId] = useState(0);
  const [chooseDelete, setChooseDelete] = useState("categery");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categeryId, setcategeryId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [TotalofPages, setTotalOFPages] = useState(0);
  const [TotalofPagesRecipe, setTotalOFPagesRecipe] = useState(0);
  const [TotalofPagesUser, setTotalOFPagesUser] = useState(0);
  const [SearchQueryCategory, setSearchQueryCategory] = useState("");
  const [CategorySelected, setCategorySelected] = useState("");
  const [SearchQueryRecipe, setSearchQueryRecipe] = useState("");
  const [SearchQueryUser, setSearchQueryUser] = useState("");
  const [groups, setgroups] = useState();
  const [SearchEmailUser, setSearchEmailUser] = useState("");
  const [TagSelected, setTagSelected] = useState("");
  const [currentPage, setcurrentPage] = useState(0);
  const [currentPagerecipe, setcurrentPagerecipe] = useState(0);
  const [currentPageuser, setcurrentPageuser] = useState(0);
  const ShowNextButton = currentPage !== TotalofPages - 1;
  const ShowPrevButton = currentPage !== 0;
  const ShowNextButtonrecipe = currentPagerecipe !== TotalofPagesRecipe - 1;
  const ShowPrevButtonrecipe = currentPagerecipe !== 0;
  const ShowNextButtonuser = currentPageuser !== TotalofPagesUser - 1;
  const ShowPrevButtonruser = currentPageuser !== 0;
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
  const closePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  async function getAllCategries(pageSize, pageNumber, name) {
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
      setcategorylist(response.data.data);
      setTotalOFPages(response?.data?.totalNumberOfPages);
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
  async function getUsers(pageSize, pageNumber, userName, email, groups) {
    setIsLoading(true);
    try {
      const res = await PrivateaxiosInstances.get(USER_URLS.GET_ALL_USER, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          userName: userName,
          email: email,
          groups: groups,
        },
      });
      console.log(res?.data?.data);
      setUsers(res?.data?.data);
      setTotalOFPagesUser(res?.data?.totalNumberOfPages);
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
  async function getAllTags() {
    try {
      const res = await PrivateaxiosInstances.get(TAG_URL.GET_ALL_TAG);
      console.log(res?.data);
      settagslist(res?.data);
    } catch (error) {
      console.log(error || "Faild to get data");
    }
  }
  async function Allcategorysselected() {
    try {
      const response = await PrivateaxiosInstances.get(
        CATEGORY_URL.GET_CATOGERY,
        {
          params: {
            pageSize: 50,
            pageNumber: 1,
          },
        }
      );
      settAllcategoryslistname(response.data.data);
      setTotalOFPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      console.log(error);
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
    getCurrentUser();
  }, []);
  useEffect(() => {
    Allcategorysselected();
  }, []);
  useEffect(() => {
    getAllTags();
  }, []);
  useEffect(() => {
    getUsers(
      6,
      currentPageuser + 1,
      SearchQueryUser,
      SearchEmailUser,
      groups === "both" ? null : groups
    );
  }, [currentPageuser, SearchQueryUser, SearchEmailUser, groups]);
  useEffect(() => {
    getAllCategries(6, currentPage + 1, SearchQueryCategory);
  }, [currentPage, SearchQueryCategory]);
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
        usergroup,
        SaveLoginData,
        setLoginData,
        categeryId,
        categorylist,
        isLoading,
        closePopup,
        setcategeryId,
        deletcategry,
        isPopupVisible,
        setIsPopupVisible,
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
        TotalofPages,
        setTotalOFPages,
        setcurrentPage,
        ShowNextButton,
        ShowPrevButton,
        SearchQueryCategory,
        setSearchQueryCategory,
        TotalofPagesRecipe,
        setTotalOFPagesRecipe,
        currentPagerecipe,
        setcurrentPagerecipe,
        ShowPrevButtonrecipe,
        ShowNextButtonrecipe,
        tagslist,
        Allcategoryslistname,
        settAllcategoryslistname,
        setTagSelected,
        setSearchQueryRecipe,
        setCategorySelected,
        getAllTags,
        Allcategorysselected,
        getAllRecipe,
        setSearchQueryUser,
        SearchQueryUser,
        ShowPrevButtonruser,
        ShowNextButtonuser,
        setcurrentPageuser,
        TotalofPagesUser,
        setTotalOFPagesUser,
        setSearchEmailUser,
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
