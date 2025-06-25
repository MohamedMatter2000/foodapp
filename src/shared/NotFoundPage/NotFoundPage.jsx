import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-md-8 text-center error-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            fill="currentColor"
            className="bi bi-exclamation-triangle-fill text-warning mb-4"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>

          <h1 className="error-title">404</h1>
          <p className="display-5 fw-bold mb-3">Oops, page lost!</p>
          <p className="lead text-muted mb-4">
            It seems you are following a broken link or the page has been moved.
          </p>
          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg rounded-pill px-4"
          >
            <i className="bi bi-house-door-fill me-2"></i> Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
