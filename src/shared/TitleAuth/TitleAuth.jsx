/* eslint-disable react/prop-types */
export default function TitleAuth({ heading, paragraph }) {
  return (
    <div className="title my-3">
      <h3 className="h5">{heading}</h3>
      <p>{paragraph}</p>
    </div>
  );
}
