import { imageURL, USER_RECEIPE_URL } from "../../../services/Api/APiconfig";
import Noimg from "../../../assets/images/nodata.png";
import { PrivateaxiosInstances } from "../../../services/Api/ApInstance";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
/* eslint-disable react/prop-types */
export default function RecipeView({ recipe, closePopup }) {
  const [isLoading, setIsLoading] = useState(false);
  const addToFavorites = async (id) => {
    setIsLoading(true);
    try {
      const res = await PrivateaxiosInstances.post(
        USER_RECEIPE_URL.ADD_USER_RECIPE,
        { recipeId: id }
      );
      console.log(res?.data);
      toast.success("Recipe added to favorites");
      closePopup();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to get tags");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="row">
      <div className="popup-overlay">
        <div
          className="popup-content col-12 col-lg-7 col-sm-9 bg-light rounded-4"
          style={{
            boxShadow:
              " rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
          }}
        >
          <div
            className=" delete-popup d-flex justify-content-end p-3"
            onClick={closePopup}
          >
            <span>&times;</span>
          </div>
          <div className=" d-flex flex-column align-items-center justify-items-center py-2">
            <h2 className="m-0">Recipe Details</h2>
            <div className="text-center">
              <img
                src={`${
                  recipe?.imagePath ? imageURL + recipe?.imagePath : Noimg
                }`}
                className="mt-2 rounded-2"
                alt=""
                style={{ maxWidth: 200 }}
              />
            </div>
            <div className="details w-100 px-4 d-flex align-items-start justify-content-evenly mt-3">
              <div>
                <p>
                  <strong>Name:</strong> {recipe?.name}
                </p>
                <p>
                  <strong>Description:</strong> {recipe?.description}
                </p>
                <p>
                  <strong>Price:</strong> ${recipe?.price}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {recipe?.category?.map((cat) => cat.name).join(", ")}
                </p>
              </div>
              <div>
                <p>
                  <strong>Tag:</strong> {recipe?.tag?.name}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(recipe?.creationDate).toLocaleString()}
                </p>
                <p>
                  <strong>Last Modified:</strong>{" "}
                  {new Date(recipe?.modificationDate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end p-3">
            <button
              type="button"
              className="btn bg-success text-light"
              onClick={() => addToFavorites(recipe.id)}
            >
              {isLoading ? <FaSpinner /> : " Add To Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
