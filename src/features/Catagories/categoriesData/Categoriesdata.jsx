// /* eslint-disable no-unused-vars */
// import { UseFoodApp } from "../../../context/AppFoodProvider";
// import Categorieslist from "../categoriesList/Categorieslist";
// import NotData from "../../../shared/NoDate/NotData";
// import Spinner from "../../../shared/NoDate/Spinner";
// export default function Categoriesdata() {
//   const { categorylist, closePopup, isPopupVisible, setcategeryId, status } =
//     UseFoodApp();
//   if (status !== 200) return <Spinner />;
//   return (
//     <table className="table  table-borderless">
//       <thead className=" table-light ">
//         <tr>
//           <th scope="col" className="px-4 py-4 rounded-start-3  text-nowrap ">
//             Id
//           </th>
//           <th scope="col" className="px-4 py-4  ">
//             Name
//           </th>
//           <th scope="col" className="px-4 py-4  ">
//             Create at
//           </th>
//           <th scope="col" className="px-4 py-4  ">
//             Action
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {categorylist.length > 0 ? (
//           categorylist.map((item) => {
//             <Categorieslist category={item} />;
//           })
//         ) : (
//           <tr>
//             <td className="text-center" colSpan={7}>
//               {status === 200 && <NotData />}
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// }
