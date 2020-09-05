export const MyPlaylistsExtractor = (MyPlaylistInfo) => {
  const my_playlists = MyPlaylistInfo.items.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images[0].url,
    total_tracks: item.tracks.total,
  }));

  return { my_playlists };
};
