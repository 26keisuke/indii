import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Post from "../../Post/Element/Element"

class ProfileHome extends Component {

    render() {
        return (
            <Wrapper>
                {this.props.posts.map(elem =>{

                    const post = this.props.favorite ? elem.post : elem

                    return (
                        <Box key={post._id}>
                            <Post
                                id={post._id}
                                topic={post.topicName}
                                title={post.postName}
                                content={post.content}
                                count={post.star.counter}
                                date={post.lastEdited}
                                img={post.postImg ? post.postImg.image : post.topicSquareImg.image }
                            />
                        </Box>
                    )
                })}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    height: 100%;
    background-color: #fafafa;
    padding: 30px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Box = styled.div`
    box-shadow: 1px 1px 10px #eaeaea;
    width: 600px;
    margin-bottom: 12px;
`

// function mapStateToProps({profile}) {
//     return {
//         profile
//     }
// }

export default connect(null, null)(ProfileHome)