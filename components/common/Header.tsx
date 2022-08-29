import React from "react";
import styled from "styled-components";
import { HeaderMenu } from "interfaces/view/header.interface";
import ROUTES from "constants/routes";
import { useRouter } from "next/router";
import { CustomImage } from "./styled-common-components";

function Header() {
  const LOGO_PATH =
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324";
  const APP_NAME = "InteractiveERD";

  const router = useRouter();
  const onClickGetStarted = () => router.push(ROUTES.APP_DIAGRAM);

  return (
    <HeaderWrap>
      <HeaderInnerWrap>
        <LogoWrap>
          <CustomImage
            src={LOGO_PATH}
            alt={APP_NAME}
            width={"100px"}
            height={"100px"}
          />
          <Text>{APP_NAME}</Text>
        </LogoWrap>
        <MenuButtonsWrap>
          <MenuWrap>
            {HEADER_MENU.map((menu: HeaderMenu) => {
              return (
                <MenuItem key={menu.name}>
                  <Text>{menu.name}</Text>
                </MenuItem>
              );
            })}
          </MenuWrap>
          <ButtonsWrap>
            <Button onClick={onClickGetStarted}>{"Get Started!"}</Button>
          </ButtonsWrap>
        </MenuButtonsWrap>
      </HeaderInnerWrap>
    </HeaderWrap>
  );
}

export default Header;

const HEADER_MENU: HeaderMenu[] = [
  {
    name: "Pricing",
    path: "",
  },
  {
    name: "Docs",
    path: "",
  },
  {
    name: "Community",
    path: "",
  },
  {
    name: "Help",
    path: "",
  },
];

// common components
const Text = styled.p``;
const Button = styled.button`
  cursor: pointer;
`;

// wrapper components
const HeaderWrap = styled.section`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: fit-content;
  width: 100vw;
  z-index: 100;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
`;

const HeaderInnerWrap = styled.div`
  max-width: 1080px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
`;

const LogoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${Text} {
    font-size: 25px;
    font-weight: 900;
    color: black;
  }
`;
const MenuButtonsWrap = styled.div``;
const MenuWrap = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 12px;
  border-right: 0.5px solid gray;
  margin-right: 20px;
  padding: 0px 20px;
`;
const MenuItem = styled.button`
  background-color: white;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid white;
  ${Text} {
    font-size: 20px;
    color: black;
  }

  &:hover {
    border-bottom: 2px solid black;
    transition: all 0.3s;
  }
`;
const ButtonsWrap = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 20px;

  ${Button} {
    border: none;
    padding: 12px 20px;
    background-color: navy;
    color : white;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
  }
`;
