import Axios from "axios";
import { removeAllCookies } from "../../helpers/removeAllCookies.helper";
import { getHeadersAuthorization } from "../../helpers/getHeadersAuthorization.helper";

export const getPlaylistRequest = async (id) => {
  const { Authorization } = getHeadersAuthorization();

  try {
    const { data } = await Axios({
      method: "GET",
      url: `https://api.spotify.com/v1/playlists/${id}`,
      headers: {
        Authorization,
      },
    });
    return data;
  } catch (error) {
    removeAllCookies();
    window.location = "/login";
  }
};
