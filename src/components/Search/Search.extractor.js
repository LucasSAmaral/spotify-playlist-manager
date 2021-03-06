export const searchTracksExtractor = (searchData) => {
  return searchData?.map((data) =>
    data.tracks.items.reduce((acc, curr) => {
      return [
        ...acc,
        {
          name: curr.name,
          artist: curr.artists[0].name,
          album: { name: curr.album.name, image: curr.album.images[2].url },
          uri: curr.uri,
          preview: curr.preview_url,
        },
      ];
    }, [])
  );
};

export const searchAlbumsExtractor = (searchData) => {
  //remove safeSearchData
  // return safeSearchData.albums?.items.reduce((acc, curr) => {
  //   return [
  //     ...acc,
  //     {
  //       name: curr.name,
  //       artist_name: curr.artists[0].name,
  //       image: curr.images[2].url,
  //       uri: curr.uri,
  //     },
  //   ];
  // }, []);
};

export const searchEpisodesExtractor = (searchData) => {
  //remove safeSearchData
  // const safeSearchData = propOr([], "0", searchData);
  // return safeSearchData.episodes?.items.reduce((acc, curr) => {
  //   return [
  //     ...acc,
  //     {
  //       name: curr.name,
  //       preview: curr.audio_preview_url,
  //       uri: curr.uri,
  //       image: curr.images[2].url,
  //     },
  //   ];
  // }, []);
};
