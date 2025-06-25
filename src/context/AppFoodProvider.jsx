/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCurrentUser } from "../services/apiUser";
import { useTags } from "../services/apiRecipe";
const AppContext = createContext();
function AppFoodProvider({ children }) {
  const [loginData, setLoginData] = useState(() => {
    let Token = localStorage.getItem("token");
    return Token ? jwtDecode(Token) : null;
  });
  const SaveLoginData = () => {
    const data = localStorage.getItem("token");
    if (data) {
      const loginDataDecode = jwtDecode(data);
      setLoginData(loginDataDecode);
    }
  };
  const { userData, isPending, isSuccess } = useCurrentUser();
  const { data: tagsData } = useTags();
  const CurrentUser = useMemo(
    () => ({
      userData,
      isPending,
      isSuccess,
    }),
    [userData, isPending, isSuccess]
  );
  const usergroup = CurrentUser?.userData?.group?.name;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      SaveLoginData();
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        loginData,
        SaveLoginData,
        setLoginData,
        CurrentUser,
        tagsData,
        usergroup,
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
