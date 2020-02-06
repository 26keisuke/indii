import React from "react"
import styled, { ThemeProvider } from "styled-components";

export const Space = styled.div`
    height: ${props => props.height};
`

const theme = {
    font: "Gennokaku Gothic",
    fontColor: {
        lightBlue: "#9EAEE5",
    },
    themeColor: {
        lightBlue: "#9EAEE5"
    }
};

const Theme = ({children}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
};

export default Theme;