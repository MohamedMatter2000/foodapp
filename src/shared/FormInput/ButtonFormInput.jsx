/* eslint-disable react/prop-types */
import { FaSpinner } from "react-icons/fa";
export default function ButtonFormInput({
  cancel,
  isLoading,
  isInputEmpty,
  isEditMode,
  classNameContainerButton = "d-flex justify-content-end gap-2",
  classNameButton,
}) {
  return (
    <div className={classNameContainerButton}>
      <button
        type="button"
        className={`btn btn-secondary ${classNameButton}`}
        onClick={cancel}
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        type="submit"
        className={`btn btn-success ${classNameButton}`}
        disabled={isLoading || isInputEmpty}
      >
        {isLoading ? (
          <>
            <FaSpinner className="spinner-border spinner-border-sm me-2" />
            {isEditMode ? "Updating..." : "Creating..."}
          </>
        ) : (
          <>{isEditMode ? "Update" : "Create"}</>
        )}
      </button>
    </div>
  );
}
