import logo from "../../../src/assets/images/nodata.png";
export default function NotData() {
  return (
    <div>
      <img src={logo} className="w-25 mx-auto" alt="" />
      <h5 className="mt-4 text-dark">No Data !</h5>
    </div>
  );
}
