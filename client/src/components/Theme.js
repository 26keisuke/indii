import React from "react"
import styled, { ThemeProvider, css } from "styled-components";

export const Space = styled.div`
    height: ${props => props.height};
    width: ${props => String(props.width) + "px"};
    background-color: ${props => props.backgroundColor};
`

// fontColorとthemeColor同じことしてる
const theme = {
    font: "Gennokaku Gothic",
    fontColor: {
        lightBlue: "#9EAEE5",
    },
    themeColor: {
        lightBlue: "#9EAEE5"
    },
    primary: "#0E1222",
    secondary: "#333A49",
    tertiary: "#9EAEE5",
    green: "#4CD964",
    unselected: "#888888", // 記述はしているが実際にはつかわれていない。参考まで程度。
    hover: "rgba(233, 233, 238, 0.25)",
    searchHover: "rgba(240, 240, 240, 0.5)",
    borderColor: "#eaeaea",

};


export const Border = styled.div`
    ${props => props.top && css`
        border-top: 1px solid #eaeaea;
    `}

    ${props => props.left && css`
        border-left: 1px solid #eaeaea;
    `}

    ${props => props.right && css`
        border-right: 1px solid #eaeaea;
    `}

    ${props => props.bottom && css`
        border-bottom: 1px solid #eaeaea;
    `}
`

const Theme = ({children}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
};

export default Theme;