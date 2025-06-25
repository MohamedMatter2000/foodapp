/* eslint-disable react/prop-types */
export default function FormInput({
  name,
  type = "text",
  rules,
  register,
  placeholder,
  option,
  error,
  isSubmitting,
}) {
  const isSelect = type === "select";
  return (
    <>
      {isSelect ? (
        <div className="mb-3">
          <select
            {...register(name, rules)}
            className={`form-select ${error ? "is-invalid" : ""}`}
            aria-label="Default select example"
          >
            <option value="">{placeholder}</option>
            {option &&
              option?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
          {error && <div className="invalid-feedback">{error.message}</div>}
        </div>
      ) : (
        <div className="mb-3">
          <div className="input-group">
            {name === "description" ? (
              <textarea
                {...register(name, rules)}
                className={`form-control textarea-resize bg-secondary-custom ${
                  error ? "is-invalid" : ""
                }`}
                placeholder={placeholder}
                disabled={isSubmitting}
              />
            ) : (
              <input
                type={type}
                className={`form-control ${error ? "is-invalid" : ""}`}
                placeholder={placeholder}
                disabled={isSubmitting}
                {...register(name, rules)}
              />
            )}
            {name === "price" && (
              <div className="input-group-append">
                <span className="input-group-text border rounded-start-0 rounded-end">
                  EGP
                </span>
              </div>
            )}
          </div>
          {error && (
            <div className="invalid-feedback d-block">{error.message}</div>
          )}
        </div>
      )}
    </>
  );
}
