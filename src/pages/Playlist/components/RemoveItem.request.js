import Axios from "axios";
import { getHeadersAuthorization } from "../../../helpers/getHeadersAuthorization.helper";

export const removeItemRequest = async ({ userId, playlistId, uri }) => {
  const { Authorization } = getHeadersAuthorization();
  try {
    const { data } = await Axios({
      method: "DELETE",
      url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
      data: {
        tracks: [{ uri: `${uri}` }],
      },
    });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
