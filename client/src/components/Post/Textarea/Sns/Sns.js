import React from "react"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import {
    EmailShareButton,
    LineShareButton,
    FacebookShareButton,
    TwitterShareButton,
    EmailIcon,
    LineIcon,
    FacebookIcon,
    TwitterIcon,
} from "react-share"

const Wrapper = styled.div`
    & > * {
        margin-right: 10px;
    }
`

const Sns = (props) => {
    const location = useLocation()

    return (
        <Wrapper>
            <EmailShareButton subject={`${props.postName} | Indii`} url={`https://indii.jp${location.pathname}`}>
                <EmailIcon size={27} round={true}/>
            </EmailShareButton>
            <TwitterShareButton title={`${props.postName} | Indii`} url={`https://indii.jp${location.pathname}`}>
                <TwitterIcon size={27} round={true}/>
            </TwitterShareButton>
            <FacebookShareButton url={`https://indii.jp${location.pathname}`}>
                <FacebookIcon size={27} round={true}/>
            </FacebookShareButton>
            <LineShareButton title={`${props.postName} | Indii`} url={`https://indii.jp${location.pathname}`}>
                <LineIcon size={27} round={true}/>
            </LineShareButton>
        </Wrapper>
    )
}

export default Sns