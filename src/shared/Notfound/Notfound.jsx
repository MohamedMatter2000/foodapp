/* eslint-disable react/prop-types */
export default function Notfound({ Message }) {
  return (
    <div className="text-center p-5">
      <div className="mb-4 text-secondary opacity-50">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      </div>
      <h5 className="text-secondary mb-2">No User Available{Message}</h5>
    </div>
  );
}
