import React from "react";
import styled from "styled-components";
import { useInfiniteSearchHook } from "../../pages/Playlist/hooks/Playlist.hooks";

const SearchResultComponent = ({ href, selectedTab, extractor }) => {
  const {
    isFetched,
    searchData,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteSearchHook(`SEARCH_${selectedTab}`, `${href}&market=US`);
  const tega = extractor(searchData);

  console.log("tega", tega);

  return (
    <div>
      <h1>Tega {selectedTab}</h1>
    </div>
  );
};

export default SearchResultComponent;
