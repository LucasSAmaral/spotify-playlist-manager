import Axios from "axios";
import { getHeadersAuthorization } from "../../helpers/getHeadersAuthorization.helper";

export const RemovePlaylistRequest = async (id) => {
  const { Authorization } = getHeadersAuthorization();

  try {
    const { data } = await Axios({
      method: "DELETE",
      url: `https://api.spotify.com/v1/playlists/${id}/followers`,
      headers: {
        Authorization,
      },
    });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
