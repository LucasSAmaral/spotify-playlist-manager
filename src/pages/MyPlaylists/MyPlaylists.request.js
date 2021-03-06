import Axios from "axios";
import { removeAllCookies } from "../../helpers/removeAllCookies.helper";
import { getHeadersAuthorization } from "../../helpers/getHeadersAuthorization.helper";

export const getUserPlayslistRequest = async () => {
  const { Authorization } = getHeadersAuthorization();

  try {
    const { data } = await Axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: {
        Authorization,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    removeAllCookies();
    window.location = "/login";
  }
};
