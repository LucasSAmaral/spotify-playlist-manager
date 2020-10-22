import React, { useEffect } from "react";
import styled from "styled-components";

const ModalBackdropComponent = (props) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <Backdrop
      onAnimationEnd={props.onAnimationEnd}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </Backdrop>
  );
};

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  position: fixed;
  z-index: 1000;
  display: flex;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ModalBackdropComponent;
