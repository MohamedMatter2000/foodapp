/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/images/ComfirmDelete.png";
import { FaSpinner } from "react-icons/fa";
export default function DeleteConfirmation({
  show,
  onHide,
  onDelete,
  isLoading,
}) {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header className="border-0" closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-items-center py-2">
          <div className="">
            <img
              src={logo}
              className="w-50  mx-auto d-block"
              alt="confirmdelete"
            />
          </div>
          <h5 className="pt-3 text-center">Delete This Item?</h5>
          <p className="text-muted w-75 px-3 text-center">
            Are you sure you want to delete this item? If you are sure just
            click on Confirm
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="outline-dark" onClick={onHide}>
          Close
        </Button>
        <Button
          disabled={isLoading}
          variant="outline-danger"
          onClick={onDelete}
        >
          {isLoading ? (
            <>
              <FaSpinner /> Deleteing...
            </>
          ) : (
            "Confirm"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
