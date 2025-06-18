/* eslint-disable react/prop-types */
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdOutlineEditCalendar, MdViewList } from "react-icons/md";
export default function ActionTable({ data, onView, showEdit, onDelete }) {
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
        <li role="button" onClick={() => onView(data?.id)}>
          <a className="dropdown-item">
            <MdViewList className="text-success fs-4" /> View
          </a>
        </li>
        {showEdit && (
          <li>
            <a className="dropdown-item">
              <MdOutlineEditCalendar className="text-success fs-4 " />
              Edit
            </a>
          </li>
        )}
        {data.group?.name === "SystemUser" && (
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
