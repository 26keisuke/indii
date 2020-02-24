import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import PropTypes from "prop-types"

import Back from "./Back"

import { Space } from "../Theme"

export const FeedBox = styled.div`
    /* height: 100%; */
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
`

export const FeedLeft = styled.div`
    width: 675px;
    flex-shrink: 0;
    height:100%;
    position: relative;
    border-right: ${props => props.noBorder ? "none" : "1px solid #d2d2d2"};
    /* overflow: scroll; */

    /* &::-webkit-scrollbar {
        width: 0 !important;
    } */
`

export const FeedRight = styled.div`
    width:100%;
    margin: 0px 15px;
    margin-top: 20px;

    & > div {
        width: 360px;
        height: 100%;
        margin: 0px auto;
    }
`

export const FeedSpace = styled.div`
    height:10px;
    background-color: #F9F9F9;
`

const FeedHeader = styled.div`
    background-color: #ffffff;
    height:44px;
    border-bottom: 1px solid #d2d2d2;
    padding-left: 80px;
    display: flex;
    align-items: center;
`

const FeedBackHeader = styled.div`
    height:40px;
    background-color: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d2d2d2;
    margin-left: -1px;
    width: 100%;
    & > div {
        margin-top:-20px;
    }

    & > p {
        color: #878787;
    }
`

class Screen extends Component {

    renderHeader = () => {
        return (
            <FeedHeader>
                {this.props.children[0]}
            </FeedHeader>
        )
    }

    renderBackHeader = () => {
        return (
            <FeedBackHeader>
                <div>
                    <Back
                        back={() => this.props.history.goBack()}
                        name="戻る"
                    />
                </div>
                <p>
                    {this.props.children[0]}
                </p>
            </FeedBackHeader>
        )
    }

    render() {

        const renderHeader = !this.props.noHeader ? this.props.withBack ? this.renderBackHeader : this.renderHeader : () => {return null}

        return (
            <FeedBox>
                <FeedLeft noBorder={this.props.noBorder}>
                    {renderHeader()}
                    { !this.props.noHeaderSpace &&
                    <FeedSpace/>
                    }
                    { this.props.noHeader
                    ?
                    this.props.children[0]
                    :
                    this.props.children[1]
                    }
                    {!this.props.space 
                    ? ""
                    : <Space height="90vh" backgroundColor="#f9f9f9"/>
                    }
                </FeedLeft>
                <FeedRight>
                    <div>
                        { this.props.noHeader
                        ?
                        this.props.children[1]
                        :
                        this.props.children[2]
                        }
                    </div>
                </FeedRight>
            </FeedBox>
        )
    }
}

Screen.defaultProps = {
    space: true,
    noBorder: false,
}

Screen.propTypes = {
    noHeaderSpace: PropTypes.bool,
    noHeader: PropTypes.bool,
    noBorder: PropTypes.bool,
    withBack: PropTypes.bool,
    space: PropTypes.bool,
    children: PropTypes.node
}


export default withRouter(Screen)