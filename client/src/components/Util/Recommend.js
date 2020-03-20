import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import { getEditorContent } from "./util"

// topicnameを小さくすることで、よりpostnameをわかりやすくしようと思う
class Recommend extends Component {

    render () {

        const flag = this.props.id

        return (
            <TrendElement to={!flag ? "" : `/post/${this.props.id}`}>
                <div>
                    { flag ? <span>{this.props.topicName}</span> : <span><Skeleton height={12} width={80}/></span>}
                    { flag ? <p>{this.props.title}</p> : <p><Skeleton height={16} width={120}/></p>}
                    { flag ? <p>{getEditorContent(this.props.content, 100)}</p> : <p><Skeleton height={12} width={140} count={4}/></p>}
                    <TrendInfo>
                        <TrendAuthor>
                            { flag ? <img src={this.props.authorImg} alt={"ポストの作成者の写真"}/> : <section><Skeleton width={27} height={27}/></section>}
                            { 
                            flag
                            ? 
                            <div>
                                <p>{this.props.author}</p>
                                <p>{this.props.editDate}</p> 
                            </div>
                            :
                            <div>
                                <Skeleton height={13} width={90}/>
                                <Skeleton height={13} width={30}/>
                            </div>
                            }       
                        </TrendAuthor>
                        {/* <p>{this.props.editDate}</p> */}
                    </TrendInfo>
                </div>
                { flag ? <img src={this.props.postImg} alt={"ポストの写真"}/> : <section><Skeleton height={100} width={100}/></section>}
            </TrendElement>
        )
    }
}


// このmax widthはtempの解決策
const TrendElement = styled(Link)`

    max-width: 335px; 

    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 25px;
    box-shadow: 1px 1px 10px #eaeaea;
    padding: 15px;
    border-radius: 8px;

    &:hover{
        background-color: ${props => props.theme.hover};
    }

    & > div {

        width: 225px;
        margin-right: 25px;  

        /* topicName */
        & > span:nth-child(1) {
            font-weight: bold;
            color: #767676;
        }

        /* postName */
        & > p:nth-child(2) {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 2px;
        }

        & > p:nth-child(3) {
            font-size: 10px;
            margin-bottom: 5px;
            height: 32px; 
            overflow: hidden;
        }
    }

    & > img {
        object-fit: contain;
        min-width: 100px;
        min-height: 100px;
        max-height: 100px;
        max-width: 100px;
    }
`

const TrendInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TrendAuthor = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 6px;

    & > img {
        width: 27px;
        height: 27px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 5px;
        object-fit: cover;
    }

    & > section {
        margin-right: 5px;
    }

    & > div {

        font-size: 10px;
        display: flex;
        flex-direction: column;

        & > p:nth-child(2) {
            color: #747474;
        }
    }
`

export default Recommend