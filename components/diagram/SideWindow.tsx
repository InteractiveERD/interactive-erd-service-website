import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { SIDE_WINDOW_WIDTH, SMALL_HEADER_HEIGHT } from "constants/view.const";

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideWindow({ isOpen, setOpen }: Props) {

    const onClose = () => setOpen(false);
  return (
    <>
      {isOpen && (
        <SideWindowWrap>
          <CloseButton onClick={onClose}>
            <IoMdClose size={25} />
          </CloseButton>
          SideWindow
        </SideWindowWrap>
      )}
    </>
  );
}

export default SideWindow;

const SideWindowWrap = styled.section`
  position: fixed;
  height: 200vh;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${SIDE_WINDOW_WIDTH}px;
  background-color: navy;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  z-index : 100;
  margin-top : ${SMALL_HEADER_HEIGHT}px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;
