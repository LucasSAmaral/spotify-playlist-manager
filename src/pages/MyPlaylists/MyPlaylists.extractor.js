export const MyPlaylistsExtractor = (MyPlaylistInfo) => {
  const my_playlists = MyPlaylistInfo.items.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images[0].url,
    total_tracks: item.tracks.total,
    owner: {
      id: item.owner.id,
      name: item.owner.display_name,
    },
  }));

  return { my_playlists };
};
