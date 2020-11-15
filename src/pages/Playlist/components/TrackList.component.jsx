import React from "react";
import { propOr } from "ramda";
import AddMusicToPlaylist from "./AddMusicToPlaylist.component";
import PlaylistItem from "./PlaylistItem.component";

const TrackListComponent = ({ isFetched, tracksInfo }) => {
  const hasTracksInfo = propOr([], "0", tracksInfo).length > 0;

  return (
    <ul className="tracks-list">
      {hasTracksInfo && <PlaylistItem header />}
      {!hasTracksInfo && isFetched ? <AddMusicToPlaylist /> : <></>}
      {tracksInfo?.map((tracks) =>
        tracks?.map((track, index) => (
          <PlaylistItem track={track} key={index} />
        ))
      )}
    </ul>
  );
};

export default TrackListComponent;
