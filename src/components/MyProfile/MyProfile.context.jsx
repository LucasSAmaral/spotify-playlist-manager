import React, { useContext, useReducer, createContext } from "react";

export const MyProfileContext = createContext();

MyProfileContext.displayName = "MyProfileContext";

const USER_INFORMATION = "USER_INFORMATION";

const initialState = {
  display_name: "",
  email: "",
  followers_total: "",
  user_id: "",
  profile_image: "",
  user_uri: "",
};

const reducer = (action) => {
  switch (action.type) {
    case USER_INFORMATION:
      return {
        ...action.payload,
      };

    default:
  }
};

export const MyProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserInfo = (userInfo) => {
    dispatch({
      type: USER_INFORMATION,
      payload: userInfo,
    });
  };

  return (
    <MyProfileContext.Provider value={{ state, setUserInfo }}>
      {children}
    </MyProfileContext.Provider>
  );
};

export const useMyProfileContext = () => {
  const { state, setUserInfo } = useContext(MyProfileContext);

  return { state, setUserInfo };
};
