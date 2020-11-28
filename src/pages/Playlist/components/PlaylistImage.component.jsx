import React from "react";
import PlaylistImagePlaceholder from "../../../components/PlaylistImagePlaceholder.component";

const PlaylistImageComponent = ({ PlaylistImage }) => {
  return (
    <>
      {PlaylistImage ? (
        <figure>
          <img src={PlaylistImage} alt="" />
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
