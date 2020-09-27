import Cookie from "js-cookie";

export const getHeadersAuthorization = () => {
  const { access_token, token_type } = Cookie.get();

  return { Authorization: `${token_type} ${access_token}` };
};
