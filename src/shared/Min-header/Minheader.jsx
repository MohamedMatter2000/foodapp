/* eslint-disable react/prop-types */ import { FaLongArrowAltRight } from "react-icons/fa";
function Minheader({ title, discribtion, btnName, recipes }) {
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
    <>
      {/* If in  Recipe Page OR Other Page */}
      <div className="sub-header container-fluid">
        {recipes ? (
          <div className="row mt-4  py-4 sub-header-bg rounded-4  ">
            <div className=" col-lg-7">
              <h5 className="h5 ">
                {recipes ? highlighRecipes(title) : title}
              </h5>
              <p className=" w-75 text-black">{discribtion}</p>
            </div>
            <div className=" col-lg-5 d-grid align-content-center ">
              <button className="btn btn-success d-flex mx-auto gap-4 px-5">
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
          <div className="d-block d-md-flex justify-content-between align-content-center mt-2 py-1 ">
            <div className="lh-1">
              <h5 className="h5 ">{title}</h5>
              <p className="fs-6 ">{discribtion}</p>
            </div>
            <div className=" mt-3 ">
              {btnName && (
                <button className="btn btn-success d-block mx-auto flex gap-4 align-content-center px-5">
                  {btnName}
                  {recipes && (
                    <span>
                      <FaLongArrowAltRight />
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Minheader;
