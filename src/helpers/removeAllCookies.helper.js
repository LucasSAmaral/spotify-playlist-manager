import Cookie from "js-cookie";

export const removeAllCookies = () => {
  const CookiesObjectKeys = Object.keys(Cookie.get());
  CookiesObjectKeys.map((CookieObjectKey) => Cookie.remove(CookieObjectKey));
};
