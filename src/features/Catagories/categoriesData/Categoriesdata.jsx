/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { CATEGORY_URL } from "../../../services/Api/APiconfig";
import { PrivateaxiosInstances } from "../../../services/Api/ApInstance";
export default function CategoriesData({
  closeAdd,
  currentCategory,
  refreshCategories,
}) {
  console.log(currentCategory);
  const isEditMode = Boolean(currentCategory);
  console.log(isEditMode);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });
  console.log(isSubmitting);
  const currentName = watch("name");
  const isInputEmpty =
    !currentName || currentName.trim() === currentCategory?.name;
  useEffect(() => {
    if (currentCategory) {
      setValue("name", currentCategory?.name);
    }
  }, [currentCategory, setValue]);
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await PrivateaxiosInstances.put(
          CATEGORY_URL.EDIT_CATOGERY(currentCategory.id),
          data
        );
        toast.success("Category updated successfully");
      } else {
        await PrivateaxiosInstances.post(CATEGORY_URL.ADD_CATOGERY, data);
        toast.success("Category added successfully");
      }
      refreshCategories();
      closeAdd();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        `Failed to ${isEditMode ? "update" : "add"} category`;
      toast.error(errorMessage);
    }
  };
  return (
    <div className="row">
      <div className="popup-overlay">
        <div className="popup-content bg-light rounded-4 col-10 col-lg-5 col-sm-8 p-4">
          <div className="delete-popup d-flex align-items-center justify-content-between p-3">
            <h2>{`${isEditMode ? "Update" : "Add"} Category`}</h2>
            <button
              type="button"
              className="btn-close"
              onClick={closeAdd}
            ></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Category Name"
                aria-label="Category Name"
                disabled={isSubmitting}
                {...register("name", {
                  required: "Category name is required",
                  minLength: {
                    value: 2,
                    message: "Category name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Category name must not exceed 50 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s\u0600-\u06FF]+$/,
                    message:
                      "Category name should only contain letters and spaces",
                  },
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
            <div className="d-flex justify-content-end gap-2 p-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeAdd}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting || isInputEmpty}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="spinner-border spinner-border-sm me-2" />
                    {isEditMode ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
