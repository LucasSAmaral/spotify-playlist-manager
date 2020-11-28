import { last } from "ramda";

export const getPlaylistId = (pathname) => {
  return last(pathname.split("/"));
};
