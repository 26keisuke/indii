import React, { Component } from "react"
import styled from "styled-components"

import People from "../../People/People"

const Box = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const BoxWrapper = styled.div`
    background-color: #fafafa;
    min-height: 100%;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Wrapper = styled.div`
    width: 300px;
    margin: 10px;
    padding: 12px 20px;

`

class Follow extends Component {

    render() {
        return (
            <BoxWrapper>
                <Box>
                    {
                        this.props.users && this.props.users.map(user => 
                            <Wrapper key={user.user._id}>
                                <People
                                    id={user.user._id}
                                    photo={user.user.photo}
                                    name={user.user.userName} 
                                    job={user.user.comment} 
                                    intro={user.user.intro}
                                />
                            </Wrapper>
                        )
                    }
                </Box>
            </BoxWrapper>
        )
    }
}

export default Follow