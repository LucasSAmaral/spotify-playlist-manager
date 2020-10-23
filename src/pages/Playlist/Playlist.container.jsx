import React, { useState, useEffect } from "react";
import "./Playlist.scss";
import { useParams } from "react-router-dom";
import { getPlaylistRequest } from "./Playlist.request";
import { useQuery, queryCache } from "react-query";
import { PlaylistExtractor, tracksExtractor } from "./Playlist.extractor";
import TextLoading from "../../components/TextLoading/TextLoading.component";
import PlaylistItem from "./components/PlaylistItem";
import { useInfiniteTracksHook } from "./hooks/Playlist.hooks";
import PlaylistImagePlaceholder from "../../components/PlaylistImagePlaceholder.component";

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
    trackData,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteTracksHook("TRACKS", PlaylistInfo.tracksHref);

  const tracksInfo = tracksExtractor(trackData);

  return (
    <div className="playlist">
      <h2>{PlaylistInfo?.name ?? "Loading..."}</h2>

      <div className="playlist-info">
        {PlaylistInfo.image ? (
          <figure>
            <img src={PlaylistInfo.image} alt="" />
          </figure>
        ) : (
          <figure>
            <PlaylistImagePlaceholder />
          </figure>
        )}

        <div className="playlist-description">
          <h3>Description:</h3>
          <h4>
            {PlaylistInfo.description !== ""
              ? PlaylistInfo?.description ?? (
                  <TextLoading width="100%" height="18px" minWidth="395px" />
                )
              : "There is no description for this playlist."}
          </h4>

          <h3>Owner:</h3>
          <h4>
            {PlaylistInfo.owner?.name ?? (
              <TextLoading width="125px" height="18px" minWidth="125px" />
            )}
          </h4>
        </div>
      </div>

      <ul className="tracks-list">
        <PlaylistItem header />
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
  );
};

export default Playlist;
