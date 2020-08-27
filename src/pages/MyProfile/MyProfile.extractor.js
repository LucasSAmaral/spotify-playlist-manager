const { propOr, pathOr } = require("ramda");

export const myProfileExtractor = (userInfo) => {
  const display_name = propOr("", "display_name", userInfo);
  const country = propOr("", "country", userInfo);
  const followers_total = pathOr(0, ["followers", "total"], userInfo);
  const user_id = propOr("", "id", userInfo);
  const profile_image = pathOr("", ["images", "0", "url"], userInfo);
  const user_uri = propOr("", "uri", userInfo);
  return {
    display_name,
    country,
    followers_total,
    user_id,
    profile_image,
    user_uri,
  };
};
