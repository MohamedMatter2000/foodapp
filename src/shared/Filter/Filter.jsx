/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";
const Filter = ({
  inputs = [
    {
      type: "search",
      placeholder: "Search by name",
      icon: CiSearch,
      onChange: null,
      value: "",
      show: true,
    },
  ],
  selects = [],
  showSearch = true,
  searchPlaceholder = "Search by name",
  onSearchChange,
  searchValue = "",
  showTags = true,
  tagsLabel = "Tags",
  tagsData = [],
  onTagChange,
  selectedTag = "",
  showCategory = true,
  categoryLabel = "Category",
  categoryData = [],
  onCategoryChange,
  selectedCategory = "",
}) => {
  const containerClasses = ` d-flex flex-sm-column  gap-3 my-3 flex-lg-row `;
  const processedInputs =
    inputs.length > 1 || !showSearch
      ? inputs
      : [
          {
            type: "search",
            placeholder: searchPlaceholder,
            icon: CiSearch,
            onChange: onSearchChange,
            value: searchValue,
            show: showSearch,
          },
        ];
  const processedSelects =
    selects.length > 0
      ? selects
      : [
          ...(showTags && tagsData.length > 0
            ? [
                {
                  label: tagsLabel,
                  data: tagsData,
                  onChange: onTagChange,
                  value: selectedTag,
                  show: showTags,
                },
              ]
            : []),
          ...(showCategory && categoryData.length > 0
            ? [
                {
                  label: categoryLabel,
                  data: categoryData,
                  onChange: onCategoryChange,
                  value: selectedCategory,
                  show: showCategory,
                },
              ]
            : []),
        ];

  const renderInput = (input, index) => {
    if (!input.show) return null;
    const IconComponent = input.icon;
    return (
      <div key={index} className="search-input-wrapper position-relative w-100">
        {IconComponent && (
          <div className="search-icon position-absolute top-50 translate-middle-y ms-3">
            <IconComponent className="fs-5 text-muted" />
          </div>
        )}
        <input
          type={input.type}
          placeholder={input.placeholder}
          className={`form-control ${
            IconComponent ? "ps-5" : "ps-3"
          } py-2 rounded-3 border`}
          value={input.value}
          onChange={input.onChange}
        />
      </div>
    );
  };
  const renderSelect = (select, index) => {
    if (!select.show) return null;
    return (
      <div key={index} className="w-100">
        <select
          className="form-select py-2 rounded-3"
          aria-label={`Select ${select.label}`}
          value={select.value}
          onChange={select.onChange}
        >
          <option value="">{select.label}</option>
          {select.data.map((item) => (
            <option key={item.id || item.value} value={item.id || item.value}>
              {item.name || item.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  return (
    <div className={`${containerClasses} `}>
      {processedInputs.map((input, index) => renderInput(input, index))}
      {processedSelects.map((select, index) => renderSelect(select, index))}
    </div>
  );
};

export default Filter;
