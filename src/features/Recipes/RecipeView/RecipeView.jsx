/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { imageURL } from "../../../services/aPiConfig";
import Noimg from "../../../assets/images/nodata.png";
import { FaSpinner, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { formatDate } from "../../../utils/helpers";
import { useFoodApp } from "../../../context/AppFoodProvider";
export default function RecipeView({ show, onHide, Recipe }) {
  const [isLoading, setIsLoading] = useState(false);
  const { usergroup } = useFoodApp();
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
        {Recipe ? (
          <div className="text-center">
            <div className="mb-4">
              <img
                src={
                  Recipe?.imagePath ? `${imageURL}${Recipe.imagePath}` : Noimg
                }
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
        ) : (
          <div className="text-center py-5">
            <div className="text-muted">
              <FaHeart size={48} className="mb-3 opacity-50" />
              <h5>No Recipe Data</h5>
              <p>Recipe information is not available.</p>
            </div>
          </div>
        )}
      </Modal.Body>
      {usergroup === "SystemUser" && (
        <Modal.Footer
          className="border-0 pt-2 pb-3 px-4"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          <div className="d-flex gap-2 w-100 justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              disabled={isLoading}
              className="px-4 fw-semibold"
              style={{ borderRadius: "8px" }}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              // onClick={addToFavorites}
              disabled={isLoading || !Recipe?.id}
              className="px-4 d-flex align-items-center gap-2 fw-semibold shadow-sm"
              style={{
                minWidth: "160px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                border: "none",
              }}
            >
              {isLoading ? (
                <>
                  <FaSpinner
                    className="spinner-border-sm"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Adding...
                </>
              ) : (
                <>
                  <FaHeart size={14} />
                  Add To Favorites
                </>
              )}
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
}
