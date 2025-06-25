/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/images/ComfirmDelete.png";
import { FaSpinner, FaTrashAlt } from "react-icons/fa";
export default function DeleteConfirmation({
  show,
  onHide,
  onDelete,
  isLoading,
  title = "Delete This Item?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}) {
  const handleDelete = () => {
    onDelete();
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      centered
      backdrop={isLoading ? "static" : true}
      keyboard={!isLoading}
      className="delete-confirmation-modal"
    >
      <Modal.Header className="border-0 pb-2">
        <Modal.Title className="fw-bold text-dark d-flex align-items-center gap-2">
          Confirm Delete
        </Modal.Title>
        {!isLoading && (
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onHide}
          />
        )}
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <div className="d-flex flex-column align-items-center text-center">
          <div className="mb-3">
            <img
              src={logo}
              className="img-fluid"
              style={{
                maxWidth: "80px",
                height: "auto",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
              alt="Delete confirmation"
              loading="lazy"
            />
          </div>
          <h5 className="fw-bold text-dark mb-3">{title}</h5>
          <p className="text-muted mb-0 px-2" style={{ lineHeight: "1.5" }}>
            {message}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-2 pb-3 px-4">
        <div className="d-flex gap-2 w-100 justify-content-end">
          <Button
            variant="outline-secondary"
            onClick={onHide}
            disabled={isLoading}
            className="px-4"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 d-flex align-items-center gap-2"
            style={{ minWidth: "120px" }}
          >
            {isLoading ? (
              <>
                <FaSpinner
                  className="spinner-border-sm"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Deleting...
              </>
            ) : (
              <>
                <FaTrashAlt size={14} />
                Delete
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
