import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Response from "../../Util/Response"
import SlateTextArea from "../../Util/TextArea/TextArea"
import Breakpoint from "../../Breakpoint"
import { Space } from "../../Theme"

const MobileTopicName = styled.h3`
    font-size: 15px;
    font-weight: bold;
    color: #767676;
`

const MobileTitle = styled.div`
    display: flex;
    font-size: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 12px;
    align-items: center;

    & > p {
        font-size: 17px;
        margin-right: 9px;
    }
`

const S1Wrapper = styled.div`
    & span {
        width: 100%;
        margin-bottom: 3px;
    }
`

class Textarea extends Component {
    render() {
        return (
            <div>
                <Breakpoint key="dabletTextAreaPostName" name="dablet">
                    <HeaderTitle>
                        {this.props.postName}
                    </HeaderTitle>
                    <HeaderUnderline/>
                    <TextAreaWrapper>
                        <SlateTextArea
                            readOnly={true}
                            content={this.props.content}
                        />
                    </TextAreaWrapper>
                </Breakpoint>

                <Breakpoint key="mobileTextAreaPostName" name="mobile">
                    { this.props.topicName
                    ?
                    <Link to={`/topic/${this.props.topicId}`}>
                        <MobileTopicName>{this.props.topicName}</MobileTopicName>
                    </Link>
                    :
                    <Skeleton width={100} height={14}/>
                    }
                    { this.props.postName
                    ?
                    <MobileTitle>
                        <p>{this.props.index && this.props.index.join(".")}</p>
                        <h1>{this.props.postName}</h1>
                    </MobileTitle>
                    :
                    <MobileTitle>
                        <Skeleton width={150} height={17}/>
                    </MobileTitle>
                    }
                    <TextAreaMobileWrapper>
                        { this.props.content
                        ?
                        <SlateTextArea
                            readOnly={true}
                            content={this.props.content}
                        />
                        :
                        <S1Wrapper>
                            <Skeleton count={5} height={16}/>
                            <Skeleton width={100} height={16}/>
                            <Space height={"10px"}/>
                            <Skeleton count={2} height={16}/>
                            <Skeleton width={100} height={16}/>
                        </S1Wrapper>
                        }
                    </TextAreaMobileWrapper>
                </Breakpoint>
                
                <Breakpoint key="mobileTextAreaResponse" name="mobile">
                    <ResponseMobileWrapper>
                        { this.props.postId 
                        ?
                        <Response
                            postId={this.props.postId}
                        />
                        :
                        <div>
                            <Skeleton width={100} height={16}/>
                        </div>
                        }
                    </ResponseMobileWrapper>
                </Breakpoint>
                
                <Breakpoint key="dabletTextAreaResponse" name="dablet">
                    <ResponseWrapper>
                        <Response
                            postId={this.props.postId}
                        />
                    </ResponseWrapper>
                </Breakpoint>

            </div>
        )
    }
}

const ResponseMobileWrapper = styled.div`
    & svg,
    & img {
        margin-right:65px;
    }

    & > div {

        display: flex;
        justify-content: flex-end;
        z-index:2;
        padding-top: 13px;

        & > div:last-child {
            margin-right: -30px;
        }
    }
`

const ResponseWrapper = styled.div`
    & > div {
        display: flex;
        justify-content: space-around;
    }
`

const TextAreaWrapper = styled.div`
    & > div {
        padding-top: 20px;
        padding-bottom: 50px;
    }
`

const TextAreaMobileWrapper = styled.div`
    & > div {
        
    }
`

const HeaderTitle = styled.h1`
    color: #222222;
    font-size: 18px;
    text-align: center;
`

const HeaderUnderline = styled.div`
    border-bottom: 1px solid #eaeaea;
    width: 50px;
    margin: 0 auto;
    margin-top: 8px;
`

export default Textarea