import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import People from "../People/People"

const Box = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const Wrapper = styled.div`
    box-shadow: 1px 1px 10px #d2d2d2;
    background-color: #ffffff;
    width: 300px;
    margin: 10px;
    padding: 12px 20px;

`

class ProfileFollow extends Component {

    render() {
        return (
            <div className="profile-wrapper-extra">
                <Box>
                    <Wrapper>
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </Wrapper>
                    <Wrapper>
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </Wrapper>
                    <Wrapper>
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </Wrapper>
                    <Wrapper>
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </Wrapper>
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

export default connect(mapStateToProps, null)(ProfileFollow)