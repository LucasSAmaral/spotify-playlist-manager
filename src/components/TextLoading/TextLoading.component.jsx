import React from "react";
import "./TextLoading.scss";

const TextLoading = ({ width, height, minWidth }) => {
  return (
    <div
      className="text-loading"
      style={{ "--width": width, "--height": height, "--min-width": minWidth }}
    />
  );
};

export default TextLoading;
