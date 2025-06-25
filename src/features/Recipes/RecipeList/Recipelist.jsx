/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/Header/Header";
import Minheader from "../../../shared/SubHeader/SubHeader";
import logo from "../../../assets/images/recipe-img.png";
import DeletConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";
import { imageURL } from "../../../services/aPiconfig";
import { useFoodApp } from "../../../context/AppFoodProvider";
import Noimg from "../../../assets/images/nodata.png";
import Paginations from "../../../shared/pagination/Pagination";
import { useEffect, useState } from "react";
import RecipeView from "../RecipeView/RecipeView";
import ActionTable from "../../../shared/ActionTable/ActionTable";
import Table from "../../../shared/ReusableTable/Table";
import usePagination from "../../../hooks/usePagination";
import useModal from "../../../hooks/useModal";
import { useDeleteRecipe, useRecipes } from "../../../services/apiRecipe";
import { useCategories } from "../../../services/apiCategory";
import { removeDuplicates } from "../../../utils/helpers";
import Filter from "../../../shared/Filter/Filter";
import { toast } from "react-toastify";
import { useAddFavorites, useFavorites } from "../../../services/apiFavorites";
import { FaEye, FaHeart } from "react-icons/fa";
export default function Recipelist() {
  const [recipeId, setrecipeId] = useState("");
  const navigate = useNavigate();
  const { isOpen, closeModal, openModal } = useModal();
  const { totalNumberOfRecords } = useCategories();
  const { usergroup, tagsData } = useFoodApp();
  const { AddFavorites, isPending: isAdding } = useAddFavorites();
  const { isDeleting, deleteRecipe } = useDeleteRecipe();
  const { dataFavorite } = useFavorites();
  const [filterrecipe, setfilterrecipe] = useState({
    TagSelected: "",
    searchname: "",
    SelectedCategory: "",
  });
  const {
    totalPages,
    currentPage,
    updateTotalPages,
    updateCurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = usePagination();
  const total = totalNumberOfRecords;
  const { Categories } = useCategories(
    {
      pageSize: total,
    },
    { enabled: !!total }
  );

  function handleDeleteRecipe(id) {
    deleteRecipe(id, {
      onSuccess: () => {
        closeModal();
      },
    });
  }
  const { Recipes, isPending, totalNumberOfPages } = useRecipes({
    pageSize: 10,
    pageNumber: currentPage,
    name: filterrecipe.searchname,
    tagId: filterrecipe.TagSelected,
    categoryId: filterrecipe.SelectedCategory,
  });
  useEffect(() => {
    if (Recipes) {
      updateTotalPages(totalNumberOfPages);
    }
  }, [Recipes, updateTotalPages, totalNumberOfPages]);
  const viewrecipe = Recipes?.filter((item) => item?.id === recipeId)[0];
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
  function handleViewDelete(id) {
    setrecipeId(id);
    openModal("DeleteRecipe");
  }
  function handleEditRecipe(id) {
    navigate(`/dashboard/recipes/${id}`);
  }
  function addToFavorites(recipeId) {
    const isAlreadyFavorite = dataFavorite?.some(
      (favorite) => favorite.recipe.id === recipeId
    );
    if (isAlreadyFavorite) {
      toast.info("This recipe is already in your favorites!");
      return;
    }
    AddFavorites(recipeId, {
      onSuccess: (data) => {
        toast.success(
          data?.message || "Recipe Added To Favorite  successfully!"
        );
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Failed to Add To Favorites"
        );
      },
    });
  }
  let columns = [
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
          className="images rounded-2"
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
      render: (row) =>
        usergroup === "SystemUser" ? (
          <div className="d-flex gap-3">
            <span role="button" onClick={() => handleViewRecipe(row?.id)}>
              <FaEye color="green" />
            </span>
            <span role="button" onClick={() => addToFavorites(row?.id)}>
              <FaHeart color="green" />
            </span>
          </div>
        ) : (
          <ActionTable
            data={row}
            onView={handleViewRecipe}
            onDelete={handleViewDelete}
            onEdit={handleEditRecipe}
          />
        ),
    },
  ];
  columns =
    usergroup === "SystemUser"
      ? columns.filter((col) => col.key !== "id")
      : columns;
  let uniqueArray = removeDuplicates(Categories);
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
      <Filter
        tagsData={tagsData}
        categoryData={uniqueArray}
        searchValue={filterrecipe.searchname}
        selectedCategory={filterrecipe.SelectedCategory}
        selectedTag={filterrecipe.TagSelected}
        onSearchChange={handleSearchName}
        onTagChange={handleSelectedTag}
        onCategoryChange={handleSelectedCategory}
      />
      <Table
        columns={columns}
        data={Recipes}
        isLoading={isPending}
        message={"No Recipe Available"}
      />
      {isOpen("DeleteRecipe") && (
        <DeletConfirmation
          show={isOpen("DeleteRecipe")}
          onHide={closeModal}
          onDelete={() => handleDeleteRecipe(recipeId)}
          isLoading={isDeleting}
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
      {Recipes?.length > 0 && totalPages > 1 && (
        <Paginations
          TotalofPages={totalPages}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
          ShowNextButton={ShowNextButton}
          ShowPrevButton={ShowPrevButton}
        />
      )}
    </div>
  );
}
