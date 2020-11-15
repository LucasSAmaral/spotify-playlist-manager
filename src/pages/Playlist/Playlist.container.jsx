import React, { useState, useEffect } from "react";
import "./Playlist.scss";
import { propOr } from "ramda";
import { useParams } from "react-router-dom";
import { getPlaylistRequest } from "./Playlist.request";
import { useQuery, queryCache } from "react-query";
import { PlaylistExtractor, tracksExtractor } from "./Playlist.extractor";
import { useInfiniteSearchHook } from "./hooks/Playlist.hooks";

import PlaylistItem from "./components/PlaylistItem.component";
import AddMusicToPlaylist from "./components/AddMusicToPlaylist.component";
import Header from "../../components/Header/Header.component";
import PlaylistInfoComponent from "./components/PlaylistInfo.component";

const Playlist = () => {
  const { id } = useParams();
  const [PlaylistInfo, setPlaylistInfo] = useState({});

  useEffect(() => {
    return () => {
      queryCache.removeQueries("TRACKS");
    };
  }, []);

  useQuery("PLAYLIST", () => getPlaylistRequest(id), {
    onSuccess: (data) => {
      const extractedPlaylistInfo = PlaylistExtractor(data);
      setPlaylistInfo({ ...extractedPlaylistInfo });
    },
    refetchOnWindowFocus: false,
  });

  const {
    isFetched,
    searchData,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteSearchHook("TRACKS", PlaylistInfo.tracksHref);

  const tracksInfo = tracksExtractor(searchData);

  const hasTracksInfo = propOr([], "0", tracksInfo).length > 0;

  return (
    <>
      <Header />
      <div className="playlist">
        <h2>{PlaylistInfo?.name ?? "Loading..."}</h2>

        <PlaylistInfoComponent
          PlaylistImage={PlaylistInfo.image}
          PlaylistDescription={PlaylistInfo?.description}
          OwnerName={PlaylistInfo?.owner?.name}
        />

        <ul className="tracks-list">
          {hasTracksInfo && <PlaylistItem header />}
          {!hasTracksInfo && isFetched ? <AddMusicToPlaylist /> : <></>}
          {tracksInfo?.map((tracks) =>
            tracks?.map((track, index) => (
              <PlaylistItem track={track} key={index} />
            ))
          )}
        </ul>
        {!isFetchingMore && canFetchMore && (
          <button className="load-more-tracks" onClick={() => fetchMore()}>
            LOAD MORE TRACKS
          </button>
        )}
      </div>
    </>
  );
};

export default Playlist;
