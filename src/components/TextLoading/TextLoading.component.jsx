import React from "react";
import "./TextLoading.scss";

const TextLoading = ({ width, height }) => {
  return (
    <div
      className="text-loading"
      style={{ "--width": width, "--height": height }}
    />
  );
};

export default TextLoading;
