export const PlaylistExtractor = (PlaylistInfo) => {
  const playlist = {
    name: PlaylistInfo.name,
    description: PlaylistInfo.description,
    image: PlaylistInfo.images[0]?.url ?? "",
    owner: {
      name: PlaylistInfo.owner.display_name,
      id: PlaylistInfo.owner.id,
    },
  };

  return playlist;
};
