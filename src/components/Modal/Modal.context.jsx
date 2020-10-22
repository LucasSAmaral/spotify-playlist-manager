import React, { createContext, useReducer, useContext } from "react";

export const ModalContext = createContext();

ModalContext.displayName = "ModalContext";

const initialState = {
  status: "CLOSED",
  component: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CLOSED":
      return { status: "CLOSED", component: null };

    case "OPENING":
      return { status: "OPENING", component: action.payload.component };

    case "OPENED":
      return { status: "OPENED", component: state.component };

    case "CLOSING":
      return { status: "CLOSING", component: state.component };

    default:
      return null;
  }
};

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = (component) =>
    dispatch({ type: "OPENING", payload: { component } });

  const closeModal = () => dispatch({ type: "CLOSING" });

  const openingHandle = () => dispatch({ type: "OPENED" });

  const closingHandle = () => dispatch({ type: "CLOSED" });

  return (
    <ModalContext.Provider
      value={{ state, openModal, closeModal, openingHandle, closingHandle }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  return { openModal, closeModal };
};
