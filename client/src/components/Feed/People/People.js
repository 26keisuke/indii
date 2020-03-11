import React, {Component} from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import PeopleFollow from "../../People/FollowBtn/FollowBtn"

const PeopleElement = styled(Link)`
    display: flex;
    flex-direction: row;
    padding: 13px 15px;
    background-color: rgba(0,0,0,0);
    cursor: pointer;
    
    
    &:hover {
        background-color: rgba(233, 233, 238, 0.25);
    }

    & > img {
        width: 37px;
        height: 37px;
        border-radius: 5px;
        object-fit: cover;
        flex-shrink: 0;
        margin-right: 10px;
    }

    & > div:nth-child(2) {

        & > p:nth-child(1) {
            font-size: 12px;
        }

        & > p:nth-child(2) {
            color: #747474;
            font-size: 10px;
            margin-top: 4px;
            margin-bottom: 5px;
        }

        & > p:nth-child(3) {
            line-height: 20px;
        }
    }
`

class PeopleFeed extends Component {

    render() {
        return (
            <PeopleElement to={"/profile/" + this.props.id}>
                <img src={this.props.img} alt={"ユーザーの写真"}/>
                <div>
                    <p>{this.props.name}</p>
                    <p>{this.props.job}</p>
                    <p>{this.props.intro}</p>
                </div>
                <PeopleFollow id={this.props.id}/>
            </PeopleElement>
        )
    }
}

export default PeopleFeed