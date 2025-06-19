/* eslint-disable react/prop-types */
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdOutlineEditCalendar, MdViewList } from "react-icons/md";
import { useLocation } from "react-router";
export default function ActionTable({
  data,
  showView = true,
  showEdit,
  onView,
  onDelete,
  onEdit,
}) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="dropdown">
      <span
        className=" dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <BsThreeDots className="fa fa-ellipsis  dropup-center dropup fs-5" />
      </span>
      <ul className="dropdown-menu">
        {showView && (
          <li role="button" onClick={() => onView(data?.id)}>
            <a className="dropdown-item">
              <MdViewList className="text-success fs-4" /> View
            </a>
          </li>
        )}
        {showEdit && (
          <li role="button" onClick={() => onEdit(data?.id)}>
            <a className="dropdown-item">
              <MdOutlineEditCalendar className="text-success fs-4 " />
              Edit
            </a>
          </li>
        )}
        {location.pathname !== "/dashboard/user" && (
          <li role="button" onClick={() => onDelete(data?.id)}>
            <a className="dropdown-item">
              <MdDelete className="text-success fs-4 cursor-pointer " />
              Delete
            </a>
          </li>
        )}
        {data.group?.name === "SystemUser" &&
          location.pathname === "/dashboard/user" && (
            <li role="button" onClick={() => onDelete(data?.id)}>
              <a className="dropdown-item">
                <MdDelete className="text-success fs-4 cursor-pointer " />
                Delete
              </a>
            </li>
          )}
      </ul>
    </div>
  );
}
