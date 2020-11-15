import React from "react";
import TextLoading from "../../../components/TextLoading/TextLoading.component";

const PlaylistDescriptionComponent = ({ PlaylistDescription, OwnerName }) => {
  return (
    <div className="playlist-description">
      <h3>Description:</h3>
      <h4>
        {PlaylistDescription !== ""
          ? PlaylistDescription ?? (
              <TextLoading width="100%" height="18px" minWidth="395px" />
            )
          : "There is no description for this playlist."}
      </h4>

      <h3>Owner:</h3>
      <h4>
        {OwnerName ?? (
          <TextLoading width="125px" height="18px" minWidth="125px" />
        )}
      </h4>
    </div>
  );
};

export default PlaylistDescriptionComponent;
