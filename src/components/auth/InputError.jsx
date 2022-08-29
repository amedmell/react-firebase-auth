import React from "react";

export default function InputError(props) {
  return (
    <>
      {props.fieldError && props.fieldTouched && (
        <span className="text-red-500 text-[12px] font-bold">
          {props.fieldError}
        </span>
      )}
    </>
  );
}
