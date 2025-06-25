// /* eslint-disable no-unused-vars */
import logo from "../../assets/images/recipe-img.png";
import { imageURL } from "../../services/aPiconfig";
import Noimg from "../../assets/images/nodata.png";
import { FaHeart } from "react-icons/fa";
import { useDeleteFavorites, useFavorites } from "../../services/apiFavorites";
import Header from "../../shared/Header/Header";
import Spinner from "../../shared/NoDate/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function Favorites() {
  const { dataFavorite, isPending } = useFavorites();
  const { DeleteFavorites } = useDeleteFavorites();
  function removeFromFavorites(RecipeId) {
    DeleteFavorites(RecipeId, {
      onSuccess: (data) => {
        toast.success(data?.message || "Recipe deleted successfully!");
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Failed to delete Recipe from Favorite"
        );
      },
    });
  }
  return (
    <div>
      <Header
        title="Favorite Items!"
        discribtion="You can now add your items that any user can order it from the Application and you can edit Itmes!"
        logo={logo}
      />
      <div className="container-fluid mt-4">
        <div className="row g-4">
          {dataFavorite?.length > 0 && !isPending ? (
            dataFavorite?.map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4"
              >
                <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden position-relative">
                  <div className="position-relative">
                    <img
                      src={
                        item?.recipe?.imagePath
                          ? imageURL + item?.recipe?.imagePath
                          : Noimg
                      }
                      className="card-img-top"
                      alt={item?.recipe?.name}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <button
                      onClick={() => removeFromFavorites(item?.id)}
                      className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle p-2 shadow-sm border-0"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <FaHeart className="text-danger" size={18} />
                    </button>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-2 text-truncate">
                      {item?.recipe?.name}
                    </h5>
                    <p
                      className="card-text text-muted mb-3 flex-grow-1"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item?.recipe?.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="badge bg-primary bg-gradient rounded-pill px-3 py-2">
                        <i className="fas fa-tag me-1"></i>
                        {item?.recipe?.price} EGP
                      </span>
                      {item?.recipe?.tag && (
                        <span className="badge bg-secondary rounded-pill">
                          {item?.recipe?.tag?.name}
                        </span>
                      )}
                    </div>
                  </div>
                  {item?.recipe?.category &&
                    item?.recipe?.category?.length > 0 && (
                      <div className="card-footer bg-light border-0 p-3">
                        <div className="d-flex flex-wrap gap-1">
                          {item?.recipe?.category
                            ?.slice(0, 2)
                            .map((cat, catIndex) => (
                              <span
                                key={catIndex}
                                className="badge bg-outline-secondary text-dark small"
                              >
                                {cat.name}
                              </span>
                            ))}
                          {item?.recipe?.category?.length > 2 && (
                            <span className="badge bg-outline-secondary text-muted small">
                              +{item?.recipe?.category?.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="d-flex justify-content-center align-items-center">
                {isPending ? (
                  <div className="text-center">
                    <Spinner />
                    <p className="text-muted mt-3">Loading....</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className=" border-0 bg-light rounded-4 p-5">
                      <div className="card-body">
                        <i
                          className="fas fa-heart-broken text-muted mb-4"
                          style={{ fontSize: "4rem" }}
                        ></i>
                        <h3 className="text-muted fw-bold mb-3">
                          No Favorite Recipes
                        </h3>
                        <p className="text-muted mb-4">
                          Add some amazing recipes to your favorites.
                        </p>
                        <Link
                          to="/dashboard/recipes"
                          className="btn btn-primary btn-lg rounded-pill px-4"
                        >
                          Go to Recipes
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
