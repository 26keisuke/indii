import React, { Component } from "react"
import styled from "styled-components"
import sample from "../../images/sample0.jpg"
import { Link } from "react-router-dom"

import PeopleFollow from "../PeopleFollow"

const PeopleElement = styled.div`
    /* padding: 10px 10px; */

    /* &:hover {
        background-color: rgba(233, 233, 238, 0.25);
    } */

    /* &:hover > div {
        background-color: rgba(0, 0, 0, 0);
    } */

    & > p {
        font-size: 11px;
        margin: 0px 1px;
        cursor: default;
    }

    & > div {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        background-color: #ffffff;
        height:37px;
        position: relative;

        & > img {
            width: 37px;
            height: 37px;
            border-radius: 5px;
            object-fit: cover;
            flex-shrink: 0;
            margin-right: 10px;
            cursor: pointer;
        }

        & > div:nth-child(2) {

            cursor: pointer;

            & > p:nth-child(1) {
                font-size: 12px;
            }

            & > p:nth-child(2) {
                color: #747474;
                font-size: 11px;
                margin-bottom: 5px;
            }
        }

        & > div:nth-child(3) {
            position: absolute;
            right: -12px;
            top: 5px;
        }
    }
`

class People extends Component {

    render() {
        return (
            <Link to={"/profile/" + this.props.id}>
                <PeopleElement>
                    <div>
                        <img src={sample}/>
                        <div>
                            <p>{this.props.name}</p>
                            <p>{this.props.job}</p>
                        </div>
                        <div>
                            <PeopleFollow/>
                        </div>
                    </div>
                    <p>{this.props.intro}</p>
                </PeopleElement>
            </Link>
        )
    }
}

export default People