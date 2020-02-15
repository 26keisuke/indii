import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { connect } from "react-redux"

import * as actions from "../../../actions"
import { checkAuth } from "../../Util/util"

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 35px;
`

const Hexagon = styled.div`

    transform: scale(0.6);
    margin-left: -8px;
    opacity: 0.1;

    & > div:nth-child(1){
        width: 0;
        border-bottom: 30px solid #9EAEE5;
        border-left: 52px solid transparent;
        border-right: 52px solid transparent;
    }

    & > div:nth-child(2){
        width: 104px;
        height: 60px;
        background-color: #9EAEE5;
    }

    & > div:nth-child(3){
        width: 0;
        border-top: 30px solid #9EAEE5;
        border-left: 52px solid transparent;
        border-right: 52px solid transparent;
    }
`

const CardElement = styled(Link)`
    padding: 5px 20px;
    width: 280px;
    height: 195px;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    margin: 10px;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;

    &:hover {
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
        transition: box-shadow 0.2s ease;
        border: 1px solid #ffffff;
    }

    & > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    & > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`

const Image = styled.img`
    width: 30px;
    height: 30px;
    top: 50px;
    left: 49px;
    position: absolute;
`

const TitleWrapper = styled.div`

    position: relative;
    margin-left: -10px;

    & > p {
        width: 188px;
        text-align: center;
        font-size: 15px;
        margin-bottom: 7px;
        white-space: nowrap;
    }

    & > div {
        position: relative;
        left: 50%;
        bottom:-7px;
        transform: translate(-50%,0%);
        width: 30%;
        height: 2px;
        opacity: 0.4;
        border-radius: 20%;
        background-color: #636480;
    }
`

const Content = styled.p`
    font-size: 10px;
    margin-top: -12px;
    color: #555555;
`

const BorderBottom = styled.div`
    width: 322px;
    left: -1px;
    bottom: -1px;
    position: absolute;
    background-color: #626480;
    height: 11px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
`

class Card extends Component {

    renderActions = () => {
        const subject = this.props.actionList.map((action,index) => {

            const url = "/action/" + this.props.category + "/" + action

            return (
                <CardElement key={index} to={url} onClick={(e) => checkAuth(e, this.props)}>
                    <div>
                        <Hexagon>
                            <div/>
                            <div/>
                            <div/>
                        </Hexagon>
                        <TitleWrapper>
                            <p>{this.props.title[index]}</p>
                            <div/>
                        </TitleWrapper>
                        <Image src={this.props.img[index]} alt="各Action項目を識別する画像"/>
                    </div>
                    <div>
                        <Content>{this.props.description[index]}</Content>
                    </div>
                    <BorderBottom/>    
                </CardElement>
            )
        })
        return subject;
    }

    render() {
        return (
            <CardWrapper>
                {this.renderActions()}
            </CardWrapper>
        )
    }
}

Card.propTypes = {
    category: PropTypes.string.isRequired,
    actionList: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.arrayOf(PropTypes.node).isRequired,
    color: PropTypes.arrayOf(PropTypes.string),
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Card);