import React from "react";

const AudioPreview = ({ previewUrl }) => {
  const audio = new Audio(previewUrl);

  return (
    <button
      onMouseEnter={() => audio.play()}
      onMouseLeave={() => audio.pause()}
    />
  );
};

export default AudioPreview;
