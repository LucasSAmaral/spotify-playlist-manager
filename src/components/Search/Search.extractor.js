import { propOr } from "ramda";

export const searchTracksExtractor = (searchData) => {
  const safeSearchData = propOr([], "0", searchData);
  return safeSearchData.tracks?.items.reduce((acc, curr) => {
    return [
      ...acc,
      {
        name: curr.name,
        artist: curr.artists[0].name,
        album: { name: curr.album.name, image: curr.album.images[2].url },
        trackId: curr.id,
        preview_url: curr.preview_url,
      },
    ];
  }, []);
};

export const searchArtistsExtractor = (searchData) => {
  const safeSearchData = propOr([], "0", searchData);
  console.log("artists extractor", safeSearchData);
};

export const searchAlbumsExtractor = (searchData) => {
  const safeSearchData = propOr([], "0", searchData);
  console.log("albums extractor", safeSearchData);
};

export const searchPlaylistsExtractor = (searchData) => {
  const safeSearchData = propOr([], "0", searchData);
  console.log("playlists extractor", safeSearchData);
};

export const searchShowsExtractor = (searchData) => {
  const safeSearchData = propOr([], "0", searchData);
  console.log("shows extractor", safeSearchData);
};

export const searchEpisodesExtractor = (searchData) => {
  const safeSearchData = propOr([], "0", searchData);
  console.log("episodes extractor", safeSearchData);
};
