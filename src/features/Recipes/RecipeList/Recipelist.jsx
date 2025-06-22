/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/Header/Header";
import Minheader from "../../../shared/SubHeader/SubHeader";
import logo from "../../../assets/images/recipe-img.png";
import DeletConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";
import { imageURL, RECEIPE_URL } from "../../../services/Api/APiconfig";
import { useFoodApp } from "../../../context/AppFoodProvider";
import Noimg from "../../../assets/images/nodata.png";
import Paginations from "../../../shared/pagination/Pagination";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import RecipeView from "../RecipeView/RecipeView";
import ActionTable from "../../../shared/ActionTable/ActionTable";
import Table from "../../../shared/ReusableTable/Table";
import { PrivateaxiosInstances } from "../../../services/Api/ApInstance";
import usePagination from "../../../hooks/usePagination";
import useModal from "../../../hooks/useModal";
import { toast } from "react-toastify";
export default function Recipelist() {
  const [recipesylist, setrecipeslist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeId, setrecipeId] = useState("");
  const {
    TotalofPages,
    getTotalofPages,
    currentPage,
    setcurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = usePagination();
  const { isOpen, closeModal, openModal } = useModal();
  const { tagslist, categories, usergroup } = useFoodApp();
  const viewrecipe = recipesylist?.filter((item) => item?.id === recipeId)[0];
  const [filterrecipe, setfilterrecipe] = useState({
    TagSelected: "",
    searchname: "",
    SelectedCategory: "",
  });
  const navigate = useNavigate();
  async function getAllRecipe(pageSize, pageNumber, tagId, name, categoryId) {
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
      getTotalofPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllRecipe(
      10,
      currentPage + 1,
      filterrecipe.TagSelected,
      filterrecipe.searchname,
      filterrecipe.SelectedCategory
    );
  }, [
    currentPage,
    filterrecipe.TagSelected,
    filterrecipe.searchname,
    filterrecipe.SelectedCategory,
  ]);
  function handleSearchName(e) {
    setfilterrecipe({
      ...filterrecipe,
      searchname: e.target.value,
    });
  }
  function handleSelectedTag(e) {
    setfilterrecipe({
      ...filterrecipe,
      TagSelected: e.target.value,
    });
  }
  function handleSelectedCategory(e) {
    setfilterrecipe({
      ...filterrecipe,
      SelectedCategory: e.target.value,
    });
  }
  function handleViewRecipe(id) {
    setrecipeId(id);
    openModal("ViewRecipe");
  }
  const handleAddRecipe = () => {
    navigate("/dashboard/recipes/new-recipe");
  };
  function removeDuplicates(array) {
    const seen = new Set();
    return array
      ?.map((item) => ({
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
  async function handleDeletRecipe(id) {
    setIsLoading(true);
    try {
      const response = await PrivateaxiosInstances.delete(
        RECEIPE_URL.DELETE_RECIPE(id)
      );
      toast.success("Delete Recipe Succeclly");
      getAllRecipe();
    } catch (error) {
      toast.error("Delete Recipe failed");
    } finally {
      setIsLoading(false);
      closeModal();
    }
  }
  function handleViewDelete(id) {
    setrecipeId(id);
    openModal("DeleteRecipe");
  }
  function handleEditRecipe(id) {
    navigate(`/dashboard/recipes/${id}`);
  }
  const columns = [
    {
      key: "id",
      title: "Id",
      render: (row) => row?.id,
    },
    { key: "Name", title: "Name", render: (row) => row?.name },
    {
      key: "Imges",
      title: "Imges",
      render: (row) => (
        <img
          className="images"
          src={row?.imagePath ? `${imageURL}${row.imagePath}` : Noimg}
        />
      ),
    },
    { key: "price", title: "price", render: (row) => row?.price },
    {
      key: "Description",
      title: "Description",
      render: (row) => row?.description,
    },
    { key: "Tags", title: "Tags", render: (row) => row?.tag?.name },
    {
      key: "category",
      title: "category",
      render: (row) => row?.category[0]?.name,
    },
    {
      key: "creationDate",
      title: "Create at",
      dateField: true,
      render: (row) => {
        return new Date(row?.creationDate).toLocaleString();
      },
    },
    {
      key: "action",
      title: "Action",
      render: (row) => (
        <ActionTable
          data={row}
          onView={handleViewRecipe}
          onDelete={handleViewDelete}
          onEdit={handleEditRecipe}
        />
      ),
    },
  ];
  let uniqueArray = removeDuplicates(categories);
  return (
    <div>
      {usergroup !== "SystemUser" && (
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
      )}
      <div className="Total-search-tag-cate d-flex flex-column flex-lg-row gap-3  my-3">
        <div className="search-input-wrapper position-relative w-100">
          <div className="search-icon position-absolute top-50 translate-middle-y ms-3">
            <CiSearch className="fs-5 text-muted" />
          </div>
          <input
            type="search"
            placeholder="Search by name"
            className="form-control ps-5 py-2 rounded-3 border"
            onChange={handleSearchName}
          />
        </div>
        <div className="w-100">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelectedTag}
          >
            <option selected>Tags</option>
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
            onChange={handleSelectedCategory}
          >
            <option selected>Category</option>
            {uniqueArray &&
              uniqueArray.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name.trim()}
                </option>
              ))}
          </select>
        </div>
      </div>
      <Table
        columns={columns}
        data={recipesylist}
        isLoading={isLoading}
        message={"No Recipe Available"}
      />
      {recipesylist.length > 0 && (
        <Paginations
          TotalofPages={TotalofPages}
          setcurrentPage={setcurrentPage}
          ShowNextButton={ShowNextButton}
          ShowPrevButton={ShowPrevButton}
        />
      )}
      {isOpen("DeleteRecipe") && (
        <DeletConfirmation
          show={isOpen("DeleteRecipe")}
          onHide={closeModal}
          onDelete={() => handleDeletRecipe(recipeId)}
          isLoading={isLoading}
        />
      )}
      {isOpen("ViewRecipe") && (
        <RecipeView
          Recipe={viewrecipe}
          show={isOpen("ViewRecipe")}
          onHide={closeModal}
          key={viewrecipe?.id}
        />
      )}
    </div>
  );
}
