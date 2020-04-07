import React, { useEffect } from "react"
import styled from "styled-components"

import Post from "../../Post/Element/Element"

const ProfileHome = ({ fetchPosts, favorite, posts }) => {

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <Wrapper>
            {posts.map(post =>{
                if(!post.postName) return null // まだfetchが完了していない時（_idはpopulateする前からあるからstar）
                return (
                    <Box key={post._id}>
                        <Post
                            id={post._id}
                            topic={post.topicName}
                            title={post.postName}
                            content={post.content}
                            count={post.star.counter}
                            date={post.lastEdited}
                            img={post.postImg[0] ? post.postImg[0].image : post.topicSquareImg[0].image }
                        />
                    </Box>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #fafafa;
    min-height: 50vh;
    padding: 30px 60px;
    padding-bottom: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Box = styled.div`
    box-shadow: 1px 1px 10px #eaeaea;
    width: 600px;
    margin-bottom: 12px;
`

export default ProfileHome