import React from "react";
import {
  searchAlbumsExtractor,
  searchEpisodesExtractor,
  searchTracksExtractor,
} from "./Search.extractor";
import SearchResultComponent from "./SearchResult.component";

const SearchResultContent = ({ selectedTab, searchResult }) => {
  switch (selectedTab) {
    case "tracks": {
      const { href } = searchResult?.tracks ?? "";
      return (
        <SearchResultComponent
          href={href}
          selectedTab="tracks"
          extractor={searchTracksExtractor}
        />
      );
    }

    case "albums": {
      const { href } = searchResult?.albums ?? "";
      return (
        <SearchResultComponent
          href={href}
          selectedTab="albums"
          extractor={searchAlbumsExtractor}
        />
      );
    }

    case "episodes": {
      const { href } = searchResult?.episodes ?? "";
      return (
        <SearchResultComponent
          href={href}
          selectedTab="episodes"
          extractor={searchEpisodesExtractor}
        />
      );
    }

    case "":
    default:
      return <></>;
  }
};

export default SearchResultContent;
