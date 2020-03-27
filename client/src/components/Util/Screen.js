import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

import Breakpoint from "../Breakpoint"
import { Space } from "../Theme"

class Screen extends Component {

    renderHeader = () => {
        return (
            <FeedHeader>
                {this.props.children[0]}
            </FeedHeader>
        )
    }

    // renderBackHeader = () => {
    //     return (
    //         <FeedBackHeader>
    //             <div>
    //                 <Back
    //                     back={() => this.props.history.goBack()}
    //                     name="戻る"
    //                 />
    //             </div>
    //             <p>
    //                 {this.props.children[0]}
    //             </p>
    //         </FeedBackHeader>
    //     )
    // }

    render() {

        const renderHeader = !this.props.noHeader ? this.props.withBack ? this.renderBackHeader : this.renderHeader : () => {return null}

        return (
            <FeedBox>
                <Breakpoint name="dablet">
                    <FeedLeft noBorder={this.props.noBorder} post={this.props.post}>
                        {renderHeader()}
                        { !this.props.noHeaderSpace &&
                        <Space height={"10px"} backgroundColor={"#F9F9F9"}/>
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
                    <FeedRight post={this.props.post}>
                        <div>
                            { this.props.noHeader
                            ?
                            this.props.children[1]
                            :
                            this.props.children[2]
                            }
                        </div>
                    </FeedRight>
                </Breakpoint>
                <Breakpoint name="mobile">
                    <FeedMobileLeft noBorder={this.props.noBorder} post={this.props.post}>
                        {renderHeader()}
                        { !this.props.noHeaderSpace &&
                        <Space height={"10px"} backgroundColor={"#F9F9F9"}/>
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
                    </FeedMobileLeft>
                </Breakpoint>
            </FeedBox>
        )
    }
}


const FeedBox = styled.div`
    display: flex;
    flex-direction: row;
`

const FeedMobileLeft = styled.div`
    width: 100%;
    padding: ${props => props.post ? "20px" : "0px"};
    flex-shrink: 0;
    height:100%;
    position: relative;
    border-right: ${props => props.noBorder ? "none" : "1px solid #eaeaea"};
`

const FeedLeft = styled.div`
    width: ${props => props.post ? "725px" : "675px"};
    padding: ${props => props.post ? "20px" : "0px"};
    flex-shrink: 0;
    height:100%;
    position: relative;
    border-right: ${props => props.noBorder ? "none" : "1px solid #eaeaea"};
`

const FeedRight = styled.div`
    width:100%;

    & > div {
        width: ${props => props.post ? "295px" : "340px"};
        margin: 0px auto;
        margin-top: ${props => props.post ? "15px" : "0px"};
        height: 100%;
    }

    padding: 20px;
    ${props => props.post && css`
        padding-left: 2px;
    `}
`

const FeedHeader = styled.div`
    background-color: #ffffff;
    height:44px;
    border-bottom: 1px solid #eaeaea;
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
    border-bottom: 1px solid #eaeaea;
    margin-left: -1px;
    width: 100%;
    & > div {
        margin-top:-20px;
    }

    & > p {
        color: #878787;
    }
`

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