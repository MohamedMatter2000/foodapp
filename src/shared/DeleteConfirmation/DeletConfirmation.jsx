/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import logo from "../../assets/images/nodata.png";

export default function DeletConfirmation({
  closePopup,
  deletcategry,
  categoryid,
}) {
  const deleteItem = () => {
    deletcategry(categoryid);
    console.log(categoryid);
    closePopup();
  };
  return (
    <>
      <div className="popup-overlay">
        <div
          className="popup-content bg-light rounded-4"
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
            <div className="">
              <img src={logo} className="w-75 mx-auto d-block" alt="" />
            </div>
            <h5 className="w-100 pt-3 text-center">Delete This Category ?</h5>
            <p className="text-muted w-75 px-3 text-center">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
          <div className="d-flex justify-content-end p-3">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={deleteItem}
            >
              Delete this item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
