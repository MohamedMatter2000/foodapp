import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/welcomeImg.png";
import { useFoodApp } from "../../context/AppFoodProvider";
import Header from "../../shared/Header/Header";
import Minheader from "../../shared/Min-header/Minheader";
export default function Dashboard() {
  const { loginData, usergroup } = useFoodApp();
  const navigate = useNavigate();
  const handleAddRecipe = () => {
    navigate("/dashboard/recipes/new-recipe");
  };
  const handleToRecipe = () => {
    navigate("/dashboard/recipes");
  };
  console.log(loginData);
  return (
    <div>
      <Header
        title={`Welcome ${loginData.userName}`}
        discribtion="This is a welcoming screen for the entry of the application , you can now see the options"
        logo={logo}
      />
      <Minheader
        title={
          usergroup !== "SystemUser"
            ? "Fill the Recipes !"
            : "Show the Recipes !"
        }
        discribtion="you can now fill the meals easily using the table and form , click here and sill it with the table !"
        btnName={usergroup !== "SystemUser" ? "Fill Recipes !" : "Recipes !"}
        recipes="true"
        handleBtnAction={
          usergroup !== "SystemUser" ? handleAddRecipe : handleToRecipe
        }
      />
    </div>
  );
}
