/* eslint-disable react/prop-types */
const Header = ({ title, discribtion, logo }) => {
  return (
    <div className="container-fluid header-container px-3 py-3 rounded-3  ">
      <div className="row align-item-center w-100">
        <div className="col-md-7 col-sm-12 d-grid align-content-center ">
          <div className="caption ">
            <h3>
              {title.split(" ").slice(0, 1).join("")}
              <span className=" ms-3 fw-light text-light">
                {title.split(" ").slice(1).join("")}
              </span>
            </h3>
            <p className="w-100">{discribtion}</p>
          </div>
        </div>
        <div className="col-md-5">
          <div className="img-container text-md-end text-sm-center">
            <img
              src={logo}
              className=" w-50  position-relative header-img"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
