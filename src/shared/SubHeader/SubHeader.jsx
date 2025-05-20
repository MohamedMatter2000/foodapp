/* eslint-disable react/prop-types */
import { FaLongArrowAltRight } from "react-icons/fa";
export default function SubHeader({
  title,
  discribtion,
  btnName,
  recipes,
  handleBtnAction,
}) {
  const highlighRecipes = (title) => {
    return title.split(/(Recipes)/g).map((word, index) =>
      word === "Recipes" ? (
        <span key={index} className="text-success">
          {word}
        </span>
      ) : (
        word
      )
    );
  };
  return (
    <div>
      {recipes ? (
        <div className=" d-flex  flex-md-row flex-column justify-content-between align-items-md-center align-items-start mt-4 p-4 bg-success bg-opacity-10 rounded-4 ">
          <div style={{ flex: "1" }}>
            <h5 className="h5">{recipes ? highlighRecipes(title) : title}</h5>
            <p className=" w-75 text-black fw-medium">{discribtion}</p>
          </div>
          <div>
            <button
              onClick={handleBtnAction}
              className="btn btn-success d-flex  gap-4 px-4 text-decoration-none text-light "
            >
              {btnName}
              {recipes && (
                <span>
                  <FaLongArrowAltRight />
                </span>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className=" d-flex justify-content-between align-content-center flex-wrap my-2 py-1 ">
          <div className="lh-1">
            <h5 className="h5 ">{title}</h5>
            <p className="fs-6 ">{discribtion}</p>
          </div>
          <div className=" mt-3 ">
            {btnName && (
              <button
                onClick={handleBtnAction}
                className="btn btn-success d-block mx-auto flex gap-4 align-content-center px-5"
              >
                {btnName}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
