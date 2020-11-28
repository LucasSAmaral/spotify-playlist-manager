import React from "react";
import AddMusicToPlaylist from "./AddMusicToPlaylist.component";
import PlaylistItem from "./PlaylistItem.component";

const TrackListComponent = ({ isFetched, tracksInfo, hasTracksInfo }) => {
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
