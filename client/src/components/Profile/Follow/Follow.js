import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import People from "../../People/People"

const Box = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const Wrapper = styled.div`
    /* box-shadow: 1px 1px 10px #d2d2d2;
    background-color: #ffffff; */
    width: 300px;
    margin: 10px;
    padding: 12px 20px;

`

class Follow extends Component {

    render() {
        return (
            <div className="profile-wrapper-extra">
                <Box>
                    {
                        this.props.users.map(user => 
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
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Follow)