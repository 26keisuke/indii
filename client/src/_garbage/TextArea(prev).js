// localstorageが最終的にAPIで上書きされている。もしlocalstorageがなければ、APIというロジックにする

import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import axios from "axios";

class TextArea extends React.Component {

    constructor(props) {
        super(props)
        // const local = localStorage.getItem("content")
        // const initialVal = local ? JSON.parse(local) : null;
        this.state = {
            // editorState: BraftEditor.createEditorState(initialVal)
            editorState: BraftEditor.createEditorState(null)
        }
        // if (local) {
        //     this.state = {
        //         editorState: BraftEditor.createEditorState(JSON.parse(local))
        //     }
        // } else {
        //     this.state = {
        //         editorState: BraftEditor.createEditorState(null)
        //     }
        // }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.draft !== this.props.draft) {
            this.setState({
                editorState: BraftEditor.createEditorState(this.props.draft.content)
            })
        }   
    }

    componentDidMount() {
        // const url = "/api/draft/" + this.props.id
        // axios.get(url)
        // .then(res => {
        //     this.setState({
        //         editorState: BraftEditor.createEditorState(res.data)
        //     })
        //     console.log("DRAFT RETRIEVED")
        // })
        // .catch(err => console.error(err))
    }

    componentWillUnmount() {
        const url = "/api/draft/" + this.props.draft._id
        axios.post(url, {content: JSON.stringify(this.state.editorState.toHTML())})
        // axios.post(url, {content: this.state.editorState.toHTML()})
        .then(res => console.log("DRAFT SAVED"))
        .catch(err => console.error(err))
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })

        // const contentState = editorState.getCurrentContent();
        // save in stringified html format since localstorage only accepts string

        // localStorage.setItem("content", JSON.stringify(editorState.toHTML()))
    }

  render () {
    // if(this.state.editorState){
    //     console.log(this.state.editorState.toHTML())
    // }
    const { editorState } = this.state

    return (
      <div className="draft-area">
        <BraftEditor
            language="jpn"
            controls={[
                "undo",
                "redo",
                "bold",
                "italic",
                "underline",
                'list-ol',
                'list-ul',
                'superScript',
                "separator",
                "blockQuote",
                "code",
                "link",
                "media",
                "hr",
                // "fullscreen",
            ]}
            value={editorState}
            controlBarClassName="draft-area-tools"
            contentClassName="draft-area-textarea"
            onChange={this.handleEditorChange}
        />
      </div>
    )

  }

}

export default TextArea