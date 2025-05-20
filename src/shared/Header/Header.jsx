/* eslint-disable react/prop-types */
const Header = ({ title, discribtion, logo }) => {
  return (
    <div className="container-fluid header-container px-3 py-3 rounded-3  ">
      <div className="row align-items-center">
        <div className="col-md-7 col-sm-12">
          <div>
            <h3>
              {title.split(" ").slice(0, 1).join("")}
              <span className=" ms-3 fw-light text-light">
                {title.split(" ").slice(1).join("")}
              </span>
            </h3>
            <p>{discribtion}</p>
          </div>
        </div>
        <div className="col-md-5">
          <div className=" text-md-end text-sm-center">
            <img src={logo} className="w-50" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
