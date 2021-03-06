export const PlaylistExtractor = (PlaylistInfo) => {
  return {
    name: PlaylistInfo.name,
    description: PlaylistInfo.description,
    image: PlaylistInfo.images[0]?.url ?? "",
    owner: {
      name: PlaylistInfo.owner.display_name,
      id: PlaylistInfo.owner.id,
    },
    tracksHref: `${PlaylistInfo.tracks.href}&market=US`,
  };
};

export const tracksExtractor = (trackInfo) => {
  return trackInfo?.map((track) =>
    track.items.reduce((acc, curr) => {
      return [
        ...acc,
        {
          name: curr.track.name,
          artist: curr.track.artists[0].name,
          album: {
            name: curr.track.album.name,
            image: curr.track.album.images[2].url,
            externalUrl: curr.track.album.external_urls.spotify,
          },
          externalUrl: curr.track.external_urls.spotify,
          trackId: curr.track.id,
          previewUrl: curr.track.preview_url,
          uri: curr.track.uri,
        },
      ];
    }, [])
  );
};
