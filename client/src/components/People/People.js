import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import PeopleFollow from "./FollowBtn/FollowBtn"

const PeopleElement = styled.div`

    padding: 15px;
    box-shadow: 1px 1px 10px #eaeaea;
    border-radius: 4px;
    cursor: pointer;

    & > p {
        font-size: 11px;
        margin: 0px 1px;
        cursor: default;
        min-height: 51px;

        & > span {
            width: 100%;
        }
    }

    & > div {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
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
                        {this.props.skeleton 
                            ? <div style={{marginRight: "10px"}}><Skeleton width={37} height={37}/></div> 
                            : <img src={this.props.photo}/>
                        }
                        <div>
                            {this.props.skeleton 
                                ? <p><Skeleton width={100} height={16}/></p> 
                                : <p>{this.props.name}</p>
                            }
                            {this.props.skeleton 
                                ? <p><Skeleton width={175} height={16}/></p> 
                                : <p>{this.props.job}</p>
                            }
                        </div>
                        {!this.props.skeleton &&
                        <div>
                            <PeopleFollow id={this.props.id}/>
                        </div>
                        }
                    </div>
                    {this.props.skeleton ? <p><Skeleton count={4} height={17}/></p> : <p>{this.props.intro}</p>}
                </PeopleElement>
            </Link>
        )
    }
}

export default People