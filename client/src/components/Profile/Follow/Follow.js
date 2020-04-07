import React, { useEffect } from "react"
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
    min-height: 50vh;
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

const Follow = ({ follower, fetchFollows, users }) => {

    useEffect(() => {
        fetchFollows()
    }, [])

    return (
        <BoxWrapper>
            <Box>
                {
                    users.map(user => {
                        if(!user.photo) return null;
                        return (
                            <Wrapper key={user._id}>
                                <People
                                    id={user._id}
                                    photo={user.photo}
                                    name={user.userName} 
                                    job={user.comment} 
                                    intro={user.intro}
                                />
                            </Wrapper>
                        )
                    })
                        
                }
            </Box>
        </BoxWrapper>
    )
}

export default Follow