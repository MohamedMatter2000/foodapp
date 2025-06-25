// /* eslint-disable no-unused-vars */
// import Header from "../../shared/Header/Header";
// import logo from "../../assets/images/recipe-img.png";
// import { useState } from "react";
// import { imageURL, USER_RECEIPE_URL } from "../../services/Api/APiconfig";
// import { PrivateaxiosInstances } from "../../services/Api/ApInstance";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import Spinner from "../../shared/NoDate/Spinner";
// import NotData from "../../shared/NoDate/NotData";
// import Noimg from "../../assets/images/nodata.png";
// import { FaHeart } from "react-icons/fa";

// export default function Favorites() {
//   const [Favorites, setFavorites] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const getFavorites = async () => {
//     setLoading(true);
//     try {
//       const res = await PrivateaxiosInstances.get(
//         USER_RECEIPE_URL.GET_USER_RECIPE
//       );
//       console.log(res?.data);
//       setFavorites(res?.data);
//     } catch (error) {
//       toast.error("T");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const removeFromFavorites = async (id) => {
//     setLoading(true);
//     try {
//       const res = await PrivateaxiosInstances.delete(
//         USER_RECEIPE_URL.DELETE_USER_RECIPE(id)
//       );
//       console.log(res?.data);
//       toast.success("Recipe removed from favorites");
//       getFavorites();
//     } catch (error) {
//       toast.error("T");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getFavorites();
//   }, []);
//   return (
//     <div>
//       <Header
//         title="Favorite Items!"
//         discribtion="You can now add your items that any user can order it from the Application and you can edit Itmes!"
//         logo={logo}
//       />
//       <div className="container-fluid mt-4">
//         <div className="row">
//           {Favorites?.data?.length > 0 && !isLoading ? (
//             Favorites?.data?.map((item, index) => (
//               <div key={index} className="col-12 col-sm-6 col-md-4 ">
//                 <div className="card position-relative m-2 ">
//                   <div className="rounded-bottom-2 overflow-hidden">
//                     <img
//                       src={
//                         item?.recipe?.imagePath
//                           ? imageURL + item?.recipe?.imagePath
//                           : Noimg
//                       }
//                       className="card-img-top  aspect-1"
//                       alt="..."
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h5 className="card-title">{item?.recipe?.name}</h5>
//                     <p className="card-text">{item?.recipe?.description}.</p>
//                     <p className="card-text">{item?.recipe?.price}.</p>
//                     <a
//                       onClick={() => removeFromFavorites(item?.id)}
//                       className="btn p-1 bg-white position-absolute top-0 end-0 m-2"
//                     >
//                       <FaHeart className="text-success" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="d-flex justify-content-center align-items-center vh-80 ">
//               {isLoading ? (
//                 <Spinner />
//               ) : (
//                 <div className="text-center">
//                   <NotData />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
export default function Favorites() {
  return <div>Favorites</div>;
}
