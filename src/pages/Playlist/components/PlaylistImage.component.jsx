import React from "react";
import PlaylistImagePlaceholder from "../../../components/PlaylistImagePlaceholder.component";

const PlaylistImageComponent = ({ image }) => {
  return (
    <>
      {image ? (
        <figure>
          <img src={image} alt="" />
        </figure>
      ) : (
        <figure>
          <PlaylistImagePlaceholder />
        </figure>
      )}
    </>
  );
};

export default PlaylistImageComponent;
