import React, { Component } from "react"
import styled, { keyframes } from "styled-components"

class Image extends Component {
    render () {
        return (
                <ImageBox>
                    <Overlay/>
                    <Container/>
                    <Tag>
                        <div>
                            <p># タグ1</p>
                        </div>
                        <div>
                            <p># タグ2</p>
                        </div>
                        <div>
                            <p># タグ3</p>
                        </div>
                    </Tag>
                    <Title>タイトルが入ります</Title>
                    <Content>桶狭間の戦い（おけはざまのたたかい）は、日本の戦国時代の永禄3年5月19日（1560年6月12日）に尾張国桶狭間で行われた。</Content>
                </ImageBox>
        )
    }
}

const ImageBox = styled.div`
    position: relative;
    margin-left: -10px;
    margin-top: -15px;
    margin-bottom: 15px;
    overflow: hidden;
    cursor: pointer;

    &:hover > div:nth-child(1) {
        height: 198px;
    }

    &:hover > div:nth-child(3) {
        bottom: 114px;
    }

    &:hover > h2 {
        bottom: 87px;
    }

    &:hover > p:nth-child(5) {
        bottom: 50px;
    }
`

const Container = styled.img`
    box-shadow: 1px 1px 10px #d2d2d2;
    height: 200px;
    width: 380px;

    /* temp */
    background-color: red;
    opacity: 0.3;
`

const Overlay = styled.div`
    content: "";
    background-color: #000000;
    opacity: 0.6;
    width: 377px;
    height: 70px;
    left: 1px;
    transition: 250ms;
    bottom: 6px;
    position: absolute;
`

const Tag = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    color: #ffffff;
    bottom: 44px;
    left: 20px;
    font-weight: bold;
    transition: 300ms;
    margin-left: -3px;
    font-weight: normal;

    & > div {
        margin-right: 10px;
        background-color: #626480;
        padding: 1px 10px;
        border-radius: 15px;
    }
`

const Title = styled.h2`
    position: absolute;
    color: #ffffff;
    font-size: 14px;
    bottom: 17px;
    left: 18px;
    font-weight: bold;
    transition: 300ms;
`

const Content = styled.p`
    position: absolute;
    bottom: -50px;
    left: 20px;
    color: white;
    padding-right: 20px;
    transition: 300ms;
`

export default Image