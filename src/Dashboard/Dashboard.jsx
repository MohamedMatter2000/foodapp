import Header from "../shared/Header/Header";
import logo from "../assets/images/welcomeImg.png";
import SubHeader from "../shared/Min-header/Minheader";
export default function Dashboard() {
  return (
    <div>
      <Header
        title="Welcome Upskilling !"
        discribtion="This is a welcoming screen for the entry of the application , you can now see the options"
        logo={logo}
      />
      <SubHeader
        title="Fill the Recipes !"
        discribtion="you can now fill the meals easily using the table and form , click here and sill it with the table !"
        btnName="Fill Recipes"
        recipes="true"
      />
    </div>
  );
}
