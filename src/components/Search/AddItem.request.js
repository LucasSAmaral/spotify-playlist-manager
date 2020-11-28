import Axios from "axios";
import { getHeadersAuthorization } from "../../helpers/getHeadersAuthorization.helper";

export const addItemRequest = async ({ userId, playlistId, data }) => {
  const { Authorization } = getHeadersAuthorization();
  const { uri } = data;
  try {
    const { data } = await Axios({
      method: "POST",
      url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
      data: {
        uris: [`${uri}`],
      },
    });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
