/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
export default function Minheader({ title, discribtion, btnName, recipes }) {
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
    <div className="sub-header container-fluid">
      <div className=" row mt-4 py-4 sub-header-bg rounded-4 ">
        <div className="col-lg-7">
          <h5 className="h5 ">{recipes ? highlighRecipes(title) : title}</h5>
          <p className=" w-75 text-black">{discribtion}</p>
        </div>
        <div className="col-lg-5 d-grid align-content-center">
          <Link
            to="/dashboard/recipes/new-recipe"
            className="text-decoration-none text-black "
          >
            <button className="btn btn-success d-flex mx-auto gap-4 px-5">
              {btnName}
              {recipes && (
                <span>
                  <FaLongArrowAltRight />
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
