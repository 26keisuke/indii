import React, { Component } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"

import { GoComment } from "react-icons/go"
// import { AiOutlineLike } from "react-icons/ai"

class Element extends Component {
    render() {

        const { 
            creator,
            date,
            title,
            description,
            handleClick,
            counter,
            selected
        } = this.props

        return (
            <Box onClick={handleClick} selected={selected}>
                { creator
                ?
                <UserName>{creator.userName}</UserName>
                :
                <UserName><Skeleton width={80} height={16}/></UserName>
                }
                { creator
                ?
                <Title>{title}</Title>
                :
                <Title><Skeleton width={140} height={20}/></Title>
                }
                { creator
                ?
                <Text>{description}</Text>
                :
                <Text><Skeleton width={270} height={16}/></Text>
                }
                <Bottom>
                    { creator
                    ?
                    <div>
                        <GoComment/>
                        {counter}
                    </div>
                    :
                    <Skeleton width={30} height={16}/>
                    }
                </Bottom>
                <Date>{date}</Date>
            </Box>
        )
    }
}

const Date = styled.div`
    color: #777777;
    font-size: 10px;
    top: 11px;
    right: 21px;
    position: absolute;
`

const UserName = styled.h5`
    margin-bottom: 5px;
    color: #767676;
`

const Text = styled.h3`
    font-size: 11px !important;
    font-weight: normal;
    margin: 10px 0px;
    max-height: 67px;
    overflow: hidden;
`

const Box = styled.div`
    display: flex;
    padding: 12px 20px;
    flex-direction: column;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    cursor: pointer;

    background-color: ${props => props.selected && "rgba(222,222,222, 0.35)"};

    &:hover{
        background-color: rgba(233, 233, 238, 0.25);
    }
`

const Title = styled.h2`
    display: flex;
    font-size: 15px;
`

const Bottom = styled.div`
    display: flex;

    & > div {

        display: flex;
        align-items: center;
        margin-right: 12px;

        & > svg {
            transform: scale(1.2);
            margin-right: 6px;
            margin-top: 2px;
        }
    }
`

export default Element