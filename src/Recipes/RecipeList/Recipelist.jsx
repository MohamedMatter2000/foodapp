import Header from "../../shared/Header/Header";
import Minheader from "../../shared/Min-header/Minheader";
import logo from "../../assets/images/recipe-img.png";
import { useState } from "react";
import { MdDelete, MdOutlineEditCalendar, MdViewList } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useEffect } from "react";
import NotData from "../../shared/NoDate/NotData";
import DeletConfirmation from "../../shared/DeleteConfirmation/DeletConfirmation";
import { PrivateaxiosInstances, RECEIPE_URL } from "../../services/urls/Urls";
export default function Recipelist() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categeryId, setcategeryId] = useState(0);
  const closePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const [recipesylist, setrecipeslist] = useState([]);
  async function getAllRecipe() {
    try {
      const response = await PrivateaxiosInstances.get(RECEIPE_URL.GET_RECIPE);
      console.log(response.data.data);
      setrecipeslist(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deletcategry(id) {
    console.log(id);
    try {
      const response = await PrivateaxiosInstances.delete(
        RECEIPE_URL.DELETE_RECIPE(categeryId)
      );
      getAllRecipe();
      console.log(response);
      // setcategorylist(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllRecipe();
  }, []);
  return (
    <div>
      <Header
        title="Recipe Itmes!"
        discribtion="You can now add your items that any user can order it from the Application and you can edit"
        logo={logo}
      />
      <Minheader
        title={"Recipe Table Details"}
        discribtion={"You can check all details"}
        btnName={"Add New Item"}
      />
      <table className="table  table-borderless">
        <thead className=" table-light">
          <tr>
            <th scope="col" className="px-4 py-4 rounded-start-3 text-nowrap">
              Id
            </th>
            <th scope="col" className="px-4 py-4 ">
              Item Name
            </th>
            <th scope="col" className="px-4 py-4 ">
              Imges
            </th>
            <th scope="col" className="px-4 py-4 ">
              price
            </th>
            <th scope="col" className="px-4 py-4 ">
              Description
            </th>
            <th scope="col" className="px-4 py-4 ">
              Created At
            </th>
            <th scope="col" className="px-4 py-4 ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {recipesylist.length > 0 ? (
            recipesylist.map((recipe) => (
              <tr key={recipe?.id}>
                <td data-label="Item Name" className="px-4 py-4 ">
                  {recipe?.id}
                </td>
                <td data-label="name" className="px-4 py-4 ">
                  {recipe?.name}
                </td>
                <td data-label="name" className="px-4 py-4 ">
                  <img
                    className="w-25"
                    src={`https://upskilling-egypt.com:3006/${recipe?.imagePath}`}
                  />
                </td>
                <td data-label="name" className="px-4 py-4 ">
                  {recipe?.price}
                </td>
                <td data-label="name" className="px-4 py-4 ">
                  {recipe?.description}
                </td>
                <td data-label="Description" className="px-4 py-4 text-wrap">
                  {new Date(recipe?.creationDate).toLocaleString()}
                </td>
                <td
                  data-label="Action"
                  className="dropup-center dropup z-3 px-4 py-4"
                >
                  <BsThreeDots
                    className="fa fa-ellipsis  dropup-center dropup fs-5 "
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu recipes border-none w-100  z-3 position-absolute mt-2 rounded-2">
                    <li>
                      <a
                        className="dropdown-item d-flex  align-items-center gap-2"
                        href="#"
                      >
                        <MdViewList className="text-success fs-4" /> View
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item d-flex  align-items-center gap-2">
                        <MdOutlineEditCalendar className="text-success fs-4" />
                        Edit
                      </a>
                    </li>
                    <li
                      onClick={function () {
                        setcategeryId(recipe.id);
                        closePopup();
                      }}
                    >
                      <a className="dropdown-item d-flex  align-items-center gap-2">
                        <MdDelete
                          className="text-success fs-4"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        />
                        Delete
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan={7}>
                <NotData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isPopupVisible && (
        <DeletConfirmation
          closePopup={closePopup}
          deletcategry={deletcategry}
          categoryid={categeryId}
        />
      )}
    </div>
  );
}
