import React from "react";
import styled from "styled-components";
import AudioPreview from "../../pages/Playlist/components/AudioPreview.component";
import { last } from "ramda";
import { useLocation } from "react-router-dom";
import { useMutation, queryCache } from "react-query";
import { useInfiniteQueryHook } from "../../hooks/InfinityQuery.hooks";
import { addItemRequest } from "./AddItem.request";

const getPlaylistId = (pathname) => {
  return last(pathname.split("/"));
};

const SearchResultComponent = ({ href, selectedTab, extractor }) => {
  const { pathname } = useLocation();
  const playlistId = getPlaylistId(pathname);
  const userInfo = queryCache.getQueryData("USER_INFO");
  const userId = userInfo.id;
  const {
    searchData,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQueryHook(`SEARCH_${selectedTab}`, `${href}&market=US`);
  const extractedSearchData = extractor(searchData);
  const [mutate] = useMutation(addItemRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("PLAYLIST");
      queryCache.invalidateQueries("TRACKS");
    },
  });
  switch (selectedTab) {
    case "tracks":
      return (
        <SearchResultWrapper>
          <ul>
            <li className="track-list-item header">
              <div className="track-list-item-title">Title</div>
              <div className="track-list-item-album">Album</div>
              <div className="track-list-item-preview">Preview</div>
              <div className="track-list-item-options">Add</div>
            </li>
            {extractedSearchData?.map((extractedData) =>
              extractedData?.map((data, index) => (
                <li key={index} className="track-list-item">
                  <div className="track-list-item-title">
                    <div className="track-list-item-wrapper">
                      <figure>
                        <img src={data.album.image} alt="" />
                      </figure>
                      <div className="track-list-item-info">
                        <p>{data.name}</p>
                        <p>{data.artist}</p>
                      </div>
                    </div>
                  </div>
                  <div className="track-list-item-album">{data.album.name}</div>
                  <div className="track-list-item-preview">
                    {data.preview && <AudioPreview previewUrl={data.preview} />}
                  </div>
                  <div
                    className="track-list-item-options"
                    onClick={() => mutate({ userId, playlistId, data })}
                  >
                    Add to Playlist
                  </div>
                </li>
              ))
            )}
          </ul>
          {!isFetchingMore && canFetchMore && (
            <button className="load-more-tracks" onClick={() => fetchMore()}>
              LOAD MORE TRACKS
            </button>
          )}
        </SearchResultWrapper>
      );

    default:
      break;
  }
};

const SearchResultWrapper = styled.div`
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
`;

export default SearchResultComponent;
