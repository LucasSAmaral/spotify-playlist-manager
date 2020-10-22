import React, { useContext } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { ModalContext } from "./Modal.context";
import ModalBackdropComponent from "./ModalBackdrop.component";

const ModalContainer = () => {
  const { state, closeModal, openingHandle, closingHandle } = useContext(
    ModalContext
  );

  const { status, component } = state;

  const classRelation = {
    OPENED: "--opened",
    OPENING: "--opening",
    CLOSED: "--closed",
    CLOSING: "--closing",
  };

  const Modal = ({
    children,
    closeModal,
    classRelation,
    onBackdropAnimationEnd,
    onModalAnimationEnd,
  }) => {
    return ReactDom.createPortal(
      <ModalBackdropComponent
        onAnimationEnd={onBackdropAnimationEnd}
        onClick={closeModal}
        className={classRelation ? classRelation : ""}
      >
        <ModalContent
          onAnimationEnd={onModalAnimationEnd}
          onClick={(e) => e.stopPropagation()}
          className="modal-content"
        >
          {children}
        </ModalContent>
      </ModalBackdropComponent>,
      document.getElementById("modal")
    );
  };

  switch (status) {
    case "OPENED":
      return <Modal closeModal={closeModal}>{component}</Modal>;

    case "OPENING":
      return (
        <Modal
          classRelation={classRelation[status]}
          onModalAnimationEnd={openingHandle}
        >
          {component}
        </Modal>
      );
    case "CLOSING":
      return (
        <Modal
          classRelation={classRelation[status]}
          onBackdropAnimationEnd={closingHandle}
        >
          {component}
        </Modal>
      );

    case "CLOSED":
      return null;
    default:
  }
};

const ModalContent = styled.div`
  position: fixed;
  background-color: #fff;
  max-width: 500px;
  width: 100%;
  padding: 20px 10px;
  z-index: 1042;
`;

export default ModalContainer;
