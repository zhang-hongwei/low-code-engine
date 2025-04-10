import React from "react";
// import "tailwindcss/tailwind.css";

const itemStyle = {
  display: "flex",
  flexDirection: "row"
};

const FieldRenderer = ({ fieldId, viewData }) => {
  const result = viewData.fieldDefinitions.find(({ _id }) => _id === fieldId);

  if (!result) return <div>{fieldId}</div>;

  //Find reference to field definition
  const fieldValue = viewData.fieldData.find(
    ({ field_ref }) => field_ref === result._id
  );

  if (!fieldValue) return <div>{result.label.value}</div>;
  if (result) {
    switch (result.type) {
      case "text":
        return (
          <div
            style={itemStyle}
            className="grid grid-cols-2 divide-x divide-gray_200 dark:divide-gray_700 items-center"
          >
            <div className="bg-gray_50 dark:bg-dark_bg h-full flex items-center px-2.5 py-1.5 font-semibold text-sm">
              <span className="mx-auto">{result.label.value}</span>
            </div>
            <div className="bg-white dark:bg-gray_800 h-full flex items-center px-2.5 py-1.5 font-semibold text-sm text-center">
              <span className="mx-auto">{fieldValue.value}</span>
            </div>
          </div>
        );
      case "reference":
        return (
          <div
            style={itemStyle}
            className="grid grid-cols-2 divide-x divide-gray_200 dark:divide-gray_700 items-center"
          >
            <div className="bg-gray_50 dark:bg-dark_bg h-full flex items-center px-2.5 py-1.5 font-semibold text-sm">
              <span className="mx-auto">{result.label.value}</span>
            </div>
            <div className="bg-white dark:bg-gray_800 h-full flex items-center px-2.5 py-1.5 font-semibold text-sm text-center">
              <div
                className="mx-auto"
                dangerouslySetInnerHTML={{ __html: fieldValue.value.title }}
              />
            </div>
          </div>
        );

      case "image":
        return (
          <div style={itemStyle}>
            <div className="bg-gray_50 dark:bg-gray_750 h-full flex p-1 font-semibold text-sm">
              <span className="mx-auto">{result.label.value}</span>
            </div>
            <div
              style={itemStyle}
              className="bg-white dark:bg-gray_800 h-96 flex relative items-center p-1 font-semibold text-sm text-center"
            >
              <img
                src={
                  fieldValue.value && fieldValue.value.key
                    ? `https://nalu.imgix.net/${fieldValue.value.key}`
                    : "https://nalu.imgix.net/nalu/image/seal.jpg"
                }
                alt={result.label.value}
                width="100"
              />
            </div>
          </div>
        );
      default:
        return (
          <div
            style={itemStyle}
            className="grid grid-cols-2 divide-x divide-gray_200 dark:divide-gray_700 items-center"
          >
            <div className="bg-gray_50 dark:bg-dark_bg h-full flex items-center px-2.5 py-1.5 font-semibold text-sm">
              <span className="mx-auto">{result.label.value}</span>
            </div>
            <div className="bg-white dark:bg-gray_800 h-full flex items-center px-2.5 py-1.5 font-semibold text-sm text-center">
              <span className="mx-auto">{fieldValue.value}</span>
            </div>
          </div>
        );
    }
  }
};

export default FieldRenderer;
