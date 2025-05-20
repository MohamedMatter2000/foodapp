/* eslint-disable react/prop-types */
import { FaSpinner } from "react-icons/fa";
function ButtonForm({ children, isSubmitting }) {
  return (
    <button
      type="submit"
      className="btn fw-semibold text-capitalize btn-success w-100 mt-3"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          Loading <FaSpinner />
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default ButtonForm;
