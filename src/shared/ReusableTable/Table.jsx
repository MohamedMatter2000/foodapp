/* eslint-disable react/prop-types */
import Spinner from "../NoDate/Spinner";
import { CiSquareRemove } from "react-icons/ci";
export default function Table({ data, columns, isLoading, message }) {
  return (
    <div>
      <table className="table table-striped  table-hover text-center align-middle">
        <thead className="table-secondary overflow-visible">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-1 py-4 ${column.className || ""}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7}>
                <Spinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-5 border-0">
                <div className="text-center p-5">
                  <div className="mb-4 text-secondary opacity-50">
                    <CiSquareRemove size={100} />
                  </div>
                  <h5 className="text-secondary mb-2">{message}</h5>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.id}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
