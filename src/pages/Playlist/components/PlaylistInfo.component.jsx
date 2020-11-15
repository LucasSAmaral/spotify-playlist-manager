import React from "react";
import PlaylistDescription from "./PlaylistDescription.component";
import PlaylistImage from "./PlaylistImage.component";

const PlaylistInfoComponent = (props) => {
  return (
    <div className="playlist-info">
      <PlaylistImage {...props} />
      <PlaylistDescription {...props} />
    </div>
  );
};

export default PlaylistInfoComponent;
