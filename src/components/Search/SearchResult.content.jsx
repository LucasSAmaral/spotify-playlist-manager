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
      const { href: tracksHref } = searchResult?.tracks ?? "";
      return (
        <SearchResultComponent
          href={tracksHref}
          selectedTab="tracks"
          extractor={searchTracksExtractor}
        />
      );
    }

    case "albums": {
      const { href: albumsHref } = searchResult?.albums ?? "";
      return (
        <SearchResultComponent
          href={albumsHref}
          selectedTab="albums"
          extractor={searchAlbumsExtractor}
        />
      );
    }

    case "episodes": {
      const { href: episodesHref } = searchResult?.episodes ?? "";
      return (
        <SearchResultComponent
          href={episodesHref}
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
