import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import sample from "../../../images/sample1.png"

import Post from "../../Post/Element/Element"

class ProfileHome extends Component {

    render() {
        return (
            <Wrapper>
                <Box>
                    <Post
                        topic={"Apache Kafka"}
                        title={"Stream Processingとの関係"}
                        content={"とにかく大量のメッセージを扱うことができる Scalable Kafkaはシングルクラスタで大規模なメッセージを扱うことができダウンタイムなしでElasticかつ透過的にスケールできる。とにかく大量のメッセージを扱うことができる. "}
                        count={202}
                        date={"August 21, 2013 5:36 AM"}
                        img={sample}
                    />
                </Box>
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

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(ProfileHome)