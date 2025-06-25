/* eslint-disable no-unused-vars */
// import Minheader from "../../../shared/Min-header/Minheader";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import { useMoveBack } from "../../../hooks/useMoveBack";
import { useCategories } from "../../../services/apiCategory";
import {
  useAddRecipe,
  useRecipeById,
  useUpdateRecipe,
} from "../../../services/apiRecipe";
import { pathToFileObject, removeDuplicates } from "../../../utils/helpers";
import Spinner from "../../../shared/NoDate/Spinner";
import FormInput from "../../../shared/FormInput/FormInput";
import ButtonFormInput from "../../../shared/FormInput/ButtonFormInput";
import { imageURL } from "../../../services/aPiConfig";
import { useFoodApp } from "../../../context/AppFoodProvider";
export default function Recipedata() {
  const moveBack = useMoveBack();
  const { tagsData } = useFoodApp();
  const [imagePreview, setImagePreview] = useState(null);
  const params = useParams();
  const recipeId = params.recipeId;
  const handleToRecipe = () => {
    moveBack();
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm();
  const watchedImage = watch("recipeImage");
  const { totalNumberOfRecords } = useCategories();
  const total = totalNumberOfRecords;
  const { Categories } = useCategories(
    {
      pageSize: total,
    },
    { enabled: !!total }
  );
  const { mutateAsync: addRecipe, isPending: isAdding } = useAddRecipe();
  const { mutateAsync: updateRecipe, isPending: isUpdating } =
    useUpdateRecipe();
  let uniqueArray = removeDuplicates(Categories);
  const isLoading = isAdding || isUpdating;
  const {
    data: recipeResponse,
    isLoading: isLoadingRecipe,
    isSuccess,
  } = useRecipeById(recipeId);
  async function onsubmit(data) {
    const formData = new FormData();
    for (let key in data) {
      if (key === "recipeImage") {
        if (data?.[key]?.[0] instanceof File) {
          formData.append(key, data?.[key]?.[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    console.log(formData);
    try {
      if (recipeId) {
        await updateRecipe({ recipeId, formData });
        toast.success("Recipe updated successfully!");
      } else {
        await addRecipe(formData);
        toast.success("Recipe created successfully!");
      }
    } catch (errors) {
      toast.error(
        errors?.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      moveBack();
      reset();
    }
  }
  useEffect(() => {
    if (
      watchedImage &&
      watchedImage.length > 0 &&
      watchedImage[0] instanceof File
    ) {
      const newPreviewUrl = URL.createObjectURL(watchedImage[0]);
      setImagePreview(newPreviewUrl);
      return () => URL.revokeObjectURL(newPreviewUrl);
    } else if (isSuccess && recipeResponse) {
      setValue("name", recipeResponse.name);
      setValue("description", recipeResponse.description);
      setValue("tagId", recipeResponse.tag?.id);
      setValue("categoriesIds", recipeResponse.category?.[0]?.id);
      setValue("price", recipeResponse.price);
      if (recipeResponse.imagePath) {
        setImagePreview(`${imageURL}${recipeResponse.imagePath}`);
        const setInitialImageFile = async () => {
          const file = await pathToFileObject(
            recipeResponse.imagePath,
            setImagePreview
          );
          if (file) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            const fileList = dataTransfer.files;
            setValue("recipeImage", fileList);
          }
        };
        setInitialImageFile();
      }
    }
  }, [isSuccess, recipeResponse, setValue, watchedImage]);
  return (
    <div>
      <SubHeader
        title=" the Recipes !"
        discribtion="you can now fill the meals easily using the table and form , click here and sill it with the table !"
        btnName="back to  Recipes"
        recipes="true"
        handleBtnAction={handleToRecipe}
      />
      {isLoadingRecipe ? (
        <div className="text-center mt-5">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onsubmit)} className="mt-5">
          <FormInput
            name="name"
            rules={{ required: "Recipe Name is required" }}
            register={register}
            placeholder="Recipe Name"
            error={errors.name}
            isSubmitting={isLoading}
          />
          <FormInput
            name="tagId"
            type="select"
            rules={{ required: "Tag is required" }}
            register={register}
            placeholder="Tags"
            option={tagsData}
            error={errors.tagId}
            isSubmitting={isLoading}
          />
          <FormInput
            name="price"
            type="number"
            rules={{
              required: "Recipe Price is required",
              min: { value: 0, message: "Must be positive price" },
            }}
            register={register}
            placeholder="Recipe Price"
            error={errors.price}
            isSubmitting={isLoading}
          />
          <FormInput
            name="categoriesIds"
            type="select"
            rules={{ required: "Categories is required" }}
            register={register}
            placeholder="Category"
            option={uniqueArray}
            error={errors.categoriesIds}
            isSubmitting={isLoading}
          />
          <FormInput
            name="description"
            rules={{ required: "Description is required" }}
            register={register}
            placeholder="Description"
            error={errors.description}
            isSubmitting={isLoading}
          />
          <label
            htmlFor="recipeImage"
            className="form-label file-image-input recipeImage dott py-3 bg-success w-100 bg-opacity-10 fw-semibold"
            style={{ cursor: "pointer" }}
          >
            <input
              {...register("recipeImage", {
                validate: (value) => {
                  if (!recipeId && (!value || value.length === 0)) {
                    return "Recipe image is required";
                  }
                  return true;
                },
              })}
              type="file"
              className="form-control d-none"
              id="recipeImage"
              accept="image/*"
            />
            {imagePreview ? (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="Recipe Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
                <p className="mt-2 mb-0 text-success">
                  Click to change the image
                </p>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center flex-column w-100">
                <FaArrowUpFromBracket />
                <p className="mb-0">
                  Drag & Drop or
                  <span className="text-success"> Choose an Image </span> to
                  Upload
                </p>
              </div>
            )}
          </label>
          {errors.recipeImage && (
            <div className="text-danger">{errors.recipeImage.message}</div>
          )}
          <img />
          <ButtonFormInput
            classNameContainerButton="my-3 d-flex justify-content-end gap-3 flex-sm-column flex-md-row"
            isEditMode={recipeId}
            cancel={() => moveBack()}
            isLoading={isLoading}
            classNameButton="px-5 py-2"
          />
        </form>
      )}
    </div>
  );
}
