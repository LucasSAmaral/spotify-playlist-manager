import React from "react";
import {
  searchAlbumsExtractor,
  searchArtistsExtractor,
  searchEpisodesExtractor,
  searchPlaylistsExtractor,
  searchShowsExtractor,
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

    case "artists": {
      const { href } = searchResult?.artists ?? "";
      return (
        <SearchResultComponent
          href={href}
          selectedTab="artists"
          extractor={searchArtistsExtractor}
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

    case "playlists": {
      const { href } = searchResult?.playlists ?? "";
      return (
        <SearchResultComponent
          href={href}
          selectedTab="playlists"
          extractor={searchPlaylistsExtractor}
        />
      );
    }

    case "shows": {
      const { href } = searchResult?.shows ?? "";
      return (
        <SearchResultComponent
          href={href}
          selectedTab="shows"
          extractor={searchShowsExtractor}
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
