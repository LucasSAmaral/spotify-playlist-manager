import React, { useState, useEffect } from "react";
import "./Playlist.scss";
import { useParams } from "react-router-dom";
import { getPlaylistRequest } from "./Playlist.request";
import { useQuery, queryCache } from "react-query";
import { PlaylistExtractor, tracksExtractor } from "./Playlist.extractor";
import { useInfiniteQueryHook } from "../../hooks/InfinityQuery.hooks";

import Header from "../../components/Header/Header.component";
import PlaylistInfoComponent from "./components/PlaylistInfo.component";
import TrackList from "./components/TrackList.component";
import { propOr } from "ramda";

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
  } = useInfiniteQueryHook("TRACKS", PlaylistInfo.tracksHref);

  const tracksInfo = tracksExtractor(searchData);

  const hasTracksInfo = propOr([], "0", tracksInfo).length > 0;

  return (
    <>
      <Header />
      <div className="playlist">
        <h2>{PlaylistInfo?.name ?? "Loading..."}</h2>

        <PlaylistInfoComponent
          {...PlaylistInfo}
          hasTracksInfo={hasTracksInfo}
        />

        <TrackList
          tracksInfo={tracksInfo}
          isFetched={isFetched}
          ownerId={PlaylistInfo?.owner?.id}
          hasTracksInfo={hasTracksInfo}
        />

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
