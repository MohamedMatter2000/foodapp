/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { imageURL } from "../../../services/aPiConfig";
import Noimg from "../../../assets/images/nodata.png";
import { Modal } from "react-bootstrap";
import { formatDate } from "../../../utils/helpers";
export default function RecipeView({ show, onHide, Recipe }) {
  const getCategoryNames = (categories) => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories.map((cat) => cat?.name || "Unknown");
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="border-0 pb-2 ">
        <Modal.Title className="fw-bold text-black d-flex align-items-center gap-2">
          Recipe Details
        </Modal.Title>
        <button
          type="button"
          className="btn-close "
          aria-label="Close"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body className="px-4 py-4">
        <div className="text-center">
          <div className="mb-4">
            <img
              src={Recipe?.imagePath ? `${imageURL}${Recipe.imagePath}` : Noimg}
              className="img-fluid rounded"
              alt={Recipe?.name || "Recipe"}
              style={{
                maxWidth: "250px",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="text-start">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Name: </strong>
                  <span className="mb-1">{Recipe?.name || "N/A"}</span>
                </div>
                <div className="mb-3">
                  <strong>Description: </strong>
                  <span className="mb-1">
                    {Recipe?.description || "No description available"}
                  </span>
                </div>
                <div className="mb-3">
                  <strong>Price: </strong>
                  <span className="mb-1 text-success fw-bold">
                    $
                    {Recipe?.price
                      ? parseFloat(Recipe.price).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Category: </strong>
                  <span className="mb-1">
                    {getCategoryNames(Recipe?.category)}
                  </span>
                </div>
                <div className="mb-3">
                  <strong>Tag: </strong>
                  <span className="mb-1">{Recipe?.tag?.name || "N/A"}</span>
                </div>
                <div className="mb-3">
                  <strong>Created: </strong>
                  <span className="mb-1 text-muted">
                    {formatDate(Recipe?.creationDate)}
                  </span>
                </div>
                <div className="mb-3">
                  <strong>Modified: </strong>
                  <span className="mb-1 text-muted">
                    {formatDate(Recipe?.modificationDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
