import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { getEditorContent } from "../../Util/util"

const Box = styled(Link)`
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    align-items: center;
    height:135px;
    padding: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${props=>props.theme.hover}
    }

    & > img {
        height: 110px;
        width:110px;
        object-fit: contain;
        padding: 0px 10px;
        flex-shrink:0;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding-left:15px;
    max-width: 440px;
    min-width: 440px;

    & > p:nth-child(2) {
        color: #333333;
        font-size:16px;
        font-weight: bold;
        margin-bottom: 2px;
    }

    & > p:nth-child(3) {
        margin-bottom: 7px;
        height: 51px;
        overflow: hidden;
    }

    & > span {
        color: #5a5a5a;
        font-size: 11px;
    }
`

const Tag = styled.div`
    display: flex;
    flex-direction: row;

    & > p {
        margin-right: 5px;
        font-size: 10px;
        color: #8F8B8B;
        margin-right: 5px;
    }
`

class Element extends Component {
    render() {
        return (
            <Box to={`/topic/${this.props.id}`}>
                <Content>
                    <Tag>
                        {this.props.tags.map(tag => {
                            return <p key={tag}>#{tag}</p>
                        })}
                    </Tag>
                    <p>{this.props.title}</p>
                    <p>{getEditorContent(this.props.content, 100)}</p>
                    <span>お気に入り数： {this.props.likes}</span>
                </Content>
                <img src={this.props.img} alt={"トピックを代表する写真"}/>
            </Box>
        )
    }
}

export default Element