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
    hover: "rgba(233, 233, 238, 0.25)",
    borderColor: "#d2d2d2",

};


export const Border = styled.div`
    ${props => props.top && css`
        border-top: 1px solid #d2d2d2;
    `}

    ${props => props.left && css`
        border-left: 1px solid #d2d2d2;
    `}

    ${props => props.right && css`
        border-right: 1px solid #d2d2d2;
    `}

    ${props => props.bottom && css`
        border-bottom: 1px solid #d2d2d2;
    `}
`

const Theme = ({children}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
};

export default Theme;