/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import { imageURL } from "../../../services/Api/APiconfig";
const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='60' cy='60' r='60' fill='url(%23grad)'/%3E%3Ccircle cx='60' cy='45' r='20' fill='white' opacity='0.9'/%3E%3Cpath d='M 25 95 Q 25 75 60 75 Q 95 75 95 95 Z' fill='white' opacity='0.9'/%3E%3C/svg%3E";
export default function ViewUser({ show, data, onHide }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getUserImage = () => {
    if (data?.imagePath) {
      return `${imageURL}${data.imagePath}`;
    }
    return DEFAULT_AVATAR;
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title className="text-primary fw-bold">User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        {data ? (
          <div className="user-details">
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <img
                  src={getUserImage()}
                  alt={`${data.userName || "User"} avatar`}
                  className="rounded-circle border border-3 border-light shadow-sm"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    backgroundColor: "#f8f9fa",
                  }}
                  onError={(e) => {
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />
              </div>
              <h5 className="mt-3 mb-0 text-dark fw-bold">
                {data.userName || "Unknown User"}
              </h5>
              <p className="text-muted small mb-0">
                {data.group?.name || "No Group"}
              </p>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="info-item p-3 bg-light rounded-3">
                  <label className="form-label text-muted small mb-1">
                    Email Address
                  </label>
                  <p className="mb-0 fw-medium">
                    {data.email || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-item p-3 bg-light rounded-3">
                  <label className="form-label text-muted small mb-1">
                    Phone Number
                  </label>
                  <p className="mb-0 fw-medium">
                    {data.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-item p-3 bg-light rounded-3">
                  <label className="form-label text-muted small mb-1">
                    Country
                  </label>
                  <p className="mb-0 fw-medium">
                    {data.country || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-item p-3 bg-light rounded-3">
                  <label className="form-label text-muted small mb-1">
                    User Group
                  </label>
                  <p className="mb-0 fw-medium">
                    {data.group?.name || "No Group"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-top">
              <h6 className="text-muted mb-3">Account Information</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar-plus text-success me-2"></i>
                    <div>
                      <small className="text-muted d-block">Created</small>
                      <span className="small fw-medium">
                        {formatDate(data.group?.creationDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-pencil-square text-warning me-2"></i>
                    <div>
                      <small className="text-muted d-block">
                        Last Modified
                      </small>
                      <span className="small fw-medium">
                        {formatDate(data.group?.modificationDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading user data...</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
