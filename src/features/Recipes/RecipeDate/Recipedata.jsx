/* eslint-disable no-unused-vars */
// import Minheader from "../../../shared/Min-header/Minheader";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFoodApp } from "../../../context/AppFoodProvider";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { imageURL, RECEIPE_URL } from "../../../services/Api/APiconfig";
import { PrivateaxiosInstances } from "../../../services/Api/ApInstance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import { useMoveBack } from "../../../hooks/useMoveBack";
export default function Recipedata() {
  const moveBack = useMoveBack();
  const [imagePreview, setImagePreview] = useState(null);
  const params = useParams();
  const recipeId = params.recipeId;
  const handleToRecipe = () => {
    moveBack();
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const { tagslist, categories, getAllTags, getAllCategories } = useFoodApp();
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
  let uniqueArray = removeDuplicates(categories);
  const pathToFileObject = async (imagePath) => {
    try {
      const fullImageUrl = `${imageURL}${imagePath}`;
      setImagePreview(fullImageUrl);
      const response = await fetch(fullImageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const fileName = imagePath.split("/").pop();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error converting path to File object:", error);
      return null;
    }
  };
  async function onsubmit(data) {
    console.log(data);
    const formData = new FormData();
    for (let key in data) {
      if (key === "recipeImage") {
        formData.append(key, data?.[key]?.[0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      if (recipeId) {
        const response = await PrivateaxiosInstances.put(
          RECEIPE_URL.UPDATE_RECIPE(recipeId),
          formData
        );
        toast.success(" Edit Recipes  Succeclly");
      } else {
        const response = await PrivateaxiosInstances.post(
          RECEIPE_URL.ADD_RECIPE,
          formData
        );
        toast.success(" Create Recipes  Succeclly");
      }
      moveBack();
      reset();
    } catch (errors) {
      toast.error(errors?.response?.data?.message);
    }
  }
  useEffect(() => {
    (async () => {
      await getAllTags();
      await getAllCategories();
      if (recipeId !== "") {
        const getRecipe = async () => {
          const response = await PrivateaxiosInstances.get(
            RECEIPE_URL.GET_RECIPE_BY_ID(recipeId)
          );
          const recipe = response?.data;
          console.log(recipe);
          setValue("name", recipe?.name);
          setValue("description", recipe?.description);
          setValue("tagId", recipe?.tag?.id);
          setValue("categoriesIds", recipe?.category[0]?.id);
          setValue("price", recipe?.price);
          if (recipe?.imagePath) {
            const file = await pathToFileObject(recipe?.imagePath);
            if (file) {
              setValue("recipeImage", [file]);
            }
          }
        };
        if (recipeId) {
          getRecipe();
        }
      }
    })();
  }, [recipeId, setValue]);

  return (
    <div>
      <SubHeader
        title=" the Recipes !"
        discribtion="you can now fill the meals easily using the table and form , click here and sill it with the table !"
        btnName="back to  Recipes"
        recipes="true"
        handleBtnAction={handleToRecipe}
      />
      <form onSubmit={handleSubmit(onsubmit)} className="mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Name"
            aria-describedby="basic-addon1"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        {errors.name && (
          <span className="text-da text-danger font-900">
            {errors.name.message}
          </span>
        )}
        <div className="selected-tags w-100 mb-3">
          <select
            {...register("tagId", { required: "Tag is required" })}
            className="form-select"
            aria-label="Default select example"
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
        {errors.tagId && (
          <span className="text-da text-danger font-900">
            {errors.tagId.message}
          </span>
        )}
        <div className="mb-3">
          <div className="input-group mb-3 ">
            <input
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Must be positive price" },
              })}
              type="number"
              className="form-control bg-secondary-custom  border border-end-0 "
              placeholder="Recipe Price"
            />
            <div className="input-group-append">
              <span className="input-group-text border  rounded-start-0 rounded-end">
                EGP
              </span>
            </div>
          </div>
          {errors.price && (
            <div className="text-danger">{errors.price.message}</div>
          )}
        </div>
        <div className="selectedcategary mb-3">
          <select
            {...register("categoriesIds", {
              required: "categories is required",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected value="">
              Category
            </option>
            {uniqueArray &&
              uniqueArray.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors.categoriesIds && (
            <div className="text-danger">{errors.categoriesIds.message}</div>
          )}
        </div>
        <div className="mb-3">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="form-control textarea-resize bg-secondary-custom"
            placeholder="Description"
          />
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>
        <label
          htmlFor="recipeImage"
          className="form-label file-image-input recipeImage dott py-3 bg-success w-100 bg-opacity-10 fw-semibold"
        >
          <div className="d-flex align-items-center justify-content-center flex-column w-100">
            <FaArrowUpFromBracket />
            <input
              {...register("recipeImage")}
              type="file"
              className="form-control d-none"
              id="recipeImage"
              accept="image/*"
            />
            <p>
              <>
                Drag & Drop or
                <span className="text-success">Choose an Image</span> to Upload
              </>
            </p>
          </div>
        </label>
        {errors.recipeImage && (
          <div className="text-danger">{errors.recipeImage.message}</div>
        )}
        <div className="mt-5 d-flex justify-content-end gap-3 flex-sm-column flex-md-row">
          <button
            type="button"
            onClick={() => moveBack()}
            className="btn btn-outline-success px-5 py-2"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-success w-full fw-semibold px-5 py-2"
          >
            {isSubmitting ? <FaSpinner /> : recipeId ? "Edit" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
