import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/welcomeImg.png";
import { useFoodApp } from "../../context/AppFoodProvider";
import Header from "../../shared/Header/Header";
import Minheader from "../../shared/SubHeader/SubHeader";
export default function Dashboard() {
  const { loginData } = useFoodApp();
  const navigate = useNavigate();
  const handleAddRecipe = () => {
    navigate("/dashboard/recipes/new-recipe");
  };
  const handleToRecipe = () => {
    navigate("/dashboard/recipes");
  };
  return (
    <div>
      <Header
        title={`Welcome ${loginData.userName}`}
        discribtion="This is a welcoming screen for the entry of the application , you can now see the options"
        logo={logo}
      />
      <Minheader
        title={
          loginData.usergroup !== "SystemUser"
            ? "Fill the Recipes !"
            : "Show the Recipes !"
        }
        discribtion="you can now fill the meals easily using the table and form , click here and sill it with the table !"
        btnName={
          loginData.usergroup !== "SystemUser" ? "Fill Recipes !" : "Recipes !"
        }
        recipes
        handleBtnAction={
          loginData.usergroup !== "SystemUser"
            ? handleAddRecipe
            : handleToRecipe
        }
      />
    </div>
  );
}
