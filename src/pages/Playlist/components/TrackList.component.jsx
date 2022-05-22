import React from "react";
import AddMusicToPlaylist from "./AddMusicToPlaylist.component";
import PlaylistHeader from "./PlaylistHeader.component";
import PlaylistItem from "./PlaylistItem.component";

const TrackListComponent = ({
  isFetched,
  tracksInfo,
  hasTracksInfo,
  ownerId,
}) => {
  return (
    <ul className="tracks-list">
      {hasTracksInfo && <PlaylistHeader ownerId={ownerId} />}
      {!hasTracksInfo && isFetched ? <AddMusicToPlaylist /> : <></>}
      {tracksInfo?.map((tracks) =>
        tracks?.map((track, index) => (
          <PlaylistItem track={track} key={index} ownerId={ownerId} />
        ))
      )}
    </ul>
  );
};

export default TrackListComponent;
