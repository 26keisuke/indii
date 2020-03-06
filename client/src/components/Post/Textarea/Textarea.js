import React, { Component } from "react"
import styled from "styled-components"
import Response from "../../Util/Response"
import BraftEditor from 'braft-editor'

class Textarea extends Component {
    render() {
        return (
            <div>
                <HeaderTitle>
                    {this.props.postName}
                </HeaderTitle>
                <HeaderUnderline/>
                <BraftEditor
                    controls={[]}
                    readOnly={true}
                    value={BraftEditor.createEditorState(this.props.content)}
                    contentClassName="post-braft"
                />
                { this.props.postId &&
                <Response
                    postId={this.props.postId}
                    wrapperStyle={wrapperStyle}
                />
                }
            </div>
        )
    }
}

const wrapperStyle= {
    display: "flex",
    justifyContent: "space-around",
}

const HeaderTitle = styled.h1`
    color: #222222;
    font-size: 18px;
    text-align: center;
`

const HeaderUnderline = styled.div`
    border-bottom: 1px solid #eaeaea;
    width: 50px;
    margin: 0 auto;
    margin-top: 8px;
`



export default Textarea