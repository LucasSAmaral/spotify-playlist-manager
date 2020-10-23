import Axios from "axios";
import { getHeadersAuthorization } from "../../helpers/getHeadersAuthorization.helper";

export const createPlaylistRequest = async ({
  userId,
  playlistName,
  description = "",
}) => {
  const { Authorization } = getHeadersAuthorization();

  try {
    const { data } = await Axios({
      method: "POST",
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
      data: {
        name: playlistName,
        description,
      },
    });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
