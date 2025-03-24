/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../shared/Header/Header";
import Minheader from "../../../shared/Min-header/Minheader";
import logo from "../../../assets/images/recipe-img.png";
import { MdDelete, MdOutlineEditCalendar, MdViewList } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import NotData from "../../../shared/NoDate/NotData";
import DeletConfirmation from "../../../shared/DeleteConfirmation/DeletConfirmation";
import { imageURL } from "../../../services/Api/APiconfig";
import { useFoodApp } from "../../../context/AppFoodProvider";
import Spinner from "../../../shared/NoDate/Spinner";
import Noimg from "../../../assets/images/nodata.png";
import Paginations from "../../../shared/pagination/Pagination";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import RecipeView from "../RecipeDate/RecipeView";
export default function Recipelist() {
  const [popview, setpopview] = useState(false);
  const [currentrecipe, setcurrentrecipe] = useState();
  const closepopview = () => {
    setpopview(!popview);
  };
  const {
    closePopup,
    isPopupVisible,
    isLoading,
    setChooseDelete,
    recipesylist,
    setrecipeId,
    TotalofPagesRecipe,
    ShowPrevButtonrecipe,
    ShowNextButtonrecipe,
    setcurrentPagerecipe,
    tagslist,
    Allcategoryslistname,
    setTagSelected,
    setSearchQueryRecipe,
    setCategorySelected,
    usergroup,
  } = useFoodApp();
  const navigate = useNavigate();
  function handleSearchBar(e) {
    setSearchQueryRecipe(e.target.value);
  }
  function handleSelectedTag(e) {
    setTagSelected(e.target.value);
  }
  function handleSelectCategory(e) {
    setCategorySelected(e.target.value);
  }
  const handleViewRecipe = (recipe) => {
    setcurrentrecipe(recipe);
    setpopview(true);
  };
  const handleDeleteRecipe = (id) => {
    setrecipeId(id);
    closePopup();
    setChooseDelete("recipe");
  };
  const handleAddRecipe = () => {
    navigate("/dashboard/recipes/new-recipe");
  };
  function removeDuplicates(array) {
    const seen = new Set();
    return array
      .map((item) => ({
        ...item,
        name: item.name.replace(/\s+/g, ""),
      }))
      .filter((item) => {
        if (seen.has(item.name)) {
          return false;
        }
        seen.add(item.name);
        return true;
      });
  }
  let uniqueArray = removeDuplicates(Allcategoryslistname);
  console.log(uniqueArray);
  return (
    <div>
      {usergroup !== "SystemUser" ? (
        <>
          <Header
            title="Recipe Itmes!"
            discribtion="You can now add your items that any user can order it from the Application and you can edit"
            logo={logo}
          />
          <Minheader
            title={"Recipe Table Details"}
            discribtion={"You can check all details"}
            btnName={"Add New Item"}
            handleBtnAction={handleAddRecipe}
          />
        </>
      ) : (
        ""
      )}
      <div className="Total-search-tag-cate d-flex flex-column flex-lg-row gap-3  my-3">
        <div
          className="search   w-100 d-flex justify-content-between align-items-center"
          style={{ marginLeft: "-20px" }}
        >
          <div
            className=" position-relative fs-5 "
            style={{ left: "40px", marginTop: "-4px" }}
          >
            <CiSearch />
          </div>
          <input
            type="search"
            placeholder="Search"
            className="w-100  px-5 py-2 rounded-3  border-1 border"
            onChange={handleSearchBar}
          />
        </div>
        <div className="selected-tags w-100">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelectedTag}
          >
            <option selected value=" ">
              Tags
            </option>
            {tagslist &&
              tagslist?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
          </select>
        </div>
        <div className="selectedcategary w-100 ">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelectCategory}
          >
            <option selected value=" ">
              Category
            </option>
            {uniqueArray &&
              uniqueArray.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name.trim()}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table  table-borderless">
          <thead className=" table-light">
            <tr>
              <th scope="col" className="px-4 py-4 rounded-start-3 text-nowrap">
                Id
              </th>
              <th scope="col" className="px-4 py-4">
                Item Name
              </th>
              <th scope="col" className="px-4 py-4">
                Imges
              </th>
              <th scope="col" className="px-4 py-4">
                price
              </th>
              <th scope="col" className="px-4 py-4">
                Description
              </th>
              <th scope="col" className="px-4 py-4">
                Tags
              </th>
              <th scope="col" className="px-4 py-4 ">
                category
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
                      className="images"
                      src={` ${
                        recipe?.imagePath ? imageURL + recipe?.imagePath : Noimg
                      }`}
                    />
                  </td>
                  <td data-label="name" className="px-4 py-4 ">
                    {recipe?.price}
                  </td>
                  <td data-label="name" className="px-4 py-4 ">
                    {recipe?.description}
                  </td>
                  <td data-label="name" className="px-4 py-4 ">
                    {recipe?.tag?.name}
                  </td>
                  <td data-label="name" className="px-4 py-4 ">
                    {recipe?.category[0]?.name ?? "none"}
                  </td>
                  <td data-label="Description" className="px-4 py-4 text-wrap">
                    {new Date(recipe?.creationDate).toLocaleString()}
                  </td>
                  <td
                    data-label="Action"
                    className="dropup-center dropup  px-4 py-4"
                  >
                    <BsThreeDots
                      className="fa fa-ellipsis  dropup-center dropup fs-5 "
                      data-bs-toggle="dropdown"
                    />
                    <ul
                      className={`${
                        usergroup === "SystemUser" ? "ViewUser" : ""
                      } dropdown-menu  recipes border-none w-100  z-3 position-absolute mt-2 rounded-2`}
                    >
                      {usergroup === "SystemUser" ? (
                        <li onClick={() => handleViewRecipe(recipe)}>
                          <a
                            className="dropdown-item d-flex  align-items-center gap-2"
                            href="#"
                          >
                            <MdViewList className="text-success fs-4" /> View
                          </a>
                        </li>
                      ) : (
                        <>
                          <Link
                            to={`/dashboard/recipes/${recipe.id}`}
                            className="dropdown-item d-flex  align-items-center gap-2"
                          >
                            <MdOutlineEditCalendar className="text-success fs-4" />
                            Edit
                          </Link>
                          <li onClick={() => handleDeleteRecipe(recipe?.id)}>
                            <a className="dropdown-item d-flex  align-items-center gap-2">
                              <MdDelete
                                className="text-success fs-4"
                                data-toggle="modal"
                                data-target="#exampleModal"
                              />
                              Delete
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={9}>
                  {isLoading ? <Spinner /> : <NotData />}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {recipesylist.length > 0 ? (
        <Paginations
          TotalofPages={TotalofPagesRecipe}
          setcurrentPage={setcurrentPagerecipe}
          ShowNextButton={ShowNextButtonrecipe}
          ShowPrevButton={ShowPrevButtonrecipe}
        />
      ) : null}
      {popview && (
        <RecipeView recipe={currentrecipe} closePopup={closepopview} />
      )}
      {isPopupVisible && <DeletConfirmation />}
    </div>
  );
}
