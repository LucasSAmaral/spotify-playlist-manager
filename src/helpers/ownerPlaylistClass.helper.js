export const ownerPlaylistClassHelper = (ownerId, userId) => {
    return ownerId === userId ? 'owner-playlist' : ''
}