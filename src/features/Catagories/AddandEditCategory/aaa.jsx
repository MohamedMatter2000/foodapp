/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFoodApp } from "../../../context/AppFoodProvider";
export default function AddandEdit({ closeAdd, currentCategry }) {
  const id = currentCategry?.id;
  const currentname = currentCategry?.name;
  const { AddandEditcategry, categorylist } = useFoodApp();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({ defaultValues: currentCategry || " " });
  const name = watch("name");
  async function onsubmit(data) {
    if (currentname === name) {
      toast.warning("NO EDIT HAPPEN");
    } else {
      AddandEditcategry(data, id);
      closeAdd();
    }
  }
  return (
    <div className="row">
      <div className="popup-overlay ">
        <div
          className="popup-content bg-light rounded-4 col-4 p-4"
          style={{
            boxShadow:
              " rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
          }}
        >
          <div className=" delete-popup d-flex align-items-center justify-content-between p-3">
            <h2> {id ? "Edit Category" : "Add Category"}</h2>
            <span onClick={closeAdd}>&times;</span>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder=" Category Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...register("name", {
                  required: "Text is required",
                })}
              />
            </div>
            {errors.name && (
              <span className="text-da text-danger font-900">
                {errors.name.message}
              </span>
            )}
            <div className="d-flex  justify-content-end p-3">
              <button className="btn btn-success  ">
                {isSubmitting ? <FaSpinner /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
