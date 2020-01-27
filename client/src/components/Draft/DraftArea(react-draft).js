// documentation is here
// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
 
import * as actions from "../../actions"

class DraftArea extends Component {
    constructor(props) {
        super(props)
        const content = localStorage.getItem("content")

        if (!content) {
            var edit = EditorState.createEmpty()
        } else {
            var edit = EditorState.createWithContent(
                                        convertFromRaw(JSON.parse(content)))
        }

        this.state = {
            editorState: edit,
            uploadedImages: [],
        }

    }

    async getData(url) {
        const res = await axios.get(url)
        return await res
    }

    componentDidMount() {
        const url = "/api/draft/" + String(this.props.id)
        axios.get(url)
        .then(res => {
            this.setState({
                editorState: EditorState.createWithContent(
                                        convertFromRaw(res.data))
            })

            // this is how you get data from server and convert to html
            // console.log(stateToHTML(convertFromRaw(res.data)))
        })
        .catch(err => console.error(err))
    }

    componentWillUnmount() {
        const contentState = this.state.editorState.getCurrentContent()
        const data = JSON.stringify(convertToRaw(contentState))
        axios.post("/api/draft", {id: this.props.id, data: data})
        .then(res => {})
        .catch(err => console.error("Failed to save editor data to server"))
    }

    onChange = (editorState) => {
        this.setState({editorState});
        // const contentState = editorState.getCurrentContent()
        // localStorage.setItem("content", JSON.stringify(convertToRaw(contentState)))
    }

    // Refer to 
    // https://github.com/jpuri/react-draft-wysiwyg/issues/346
    uploadImageCallBack = (file) => {
 
        let uploadedImages = this.state.uploadedImages;
    
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file),
        }
    
        uploadedImages.push(imageObject);
    
        this.setState({uploadedImages: uploadedImages})
        
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    }
    
    render() {
        return (
            <Editor 
                editorState={this.state.editorState}                   
                wrapperClassName="draft-area-tools"              
                editorClassName="draft-area-textarea"
                onEditorStateChange={this.onChange}
                toolbar={{
                    options: ['inline',
                             'blockType',
                             'list', 
                             'textAlign', 
                             'link', 
                             'embedded', 
                             'image', 
                             'remove', 
                             'history'],
                    image: {
                        uploadCallback: this.uploadImageCallBack,
                        previewImage: true,
                    }
                }}
                localization={{
                    translations : jpTranslate
                }}
            />
        )   
    }
}



const jpTranslate = {   
    // Generic
    "generic.add": "追加",
    "generic.cancel": "キャンセル",
  
    // BlockType
    "components.controls.blocktype.h1": "H1",
    "components.controls.blocktype.h2": "H2",
    "components.controls.blocktype.h3": "H3",
    "components.controls.blocktype.h4": "H4",
    "components.controls.blocktype.h5": "H5",
    "components.controls.blocktype.h6": "H6",
    "components.controls.blocktype.blockquote": "引用",
    "components.controls.blocktype.code": "コード",
    "components.controls.blocktype.blocktype": "ブロック",
    "components.controls.blocktype.normal": "通常",
  
    // Embedded
    "components.controls.embedded.embedded": "Embedded",
    "components.controls.embedded.embeddedlink": "Embedded Link",
    "components.controls.embedded.enterlink": "Enter link",
  
    // History
    "components.controls.history.history": "History",
    "components.controls.history.undo": "Undo",
    "components.controls.history.redo": "Redo",
  
    // Image
    "components.controls.image.image": "Image",
    "components.controls.image.fileUpload": "File Upload",
    "components.controls.image.byURL": "URL",
    "components.controls.image.dropFileText": "Drop the file or click to upload",
  
    // Inline
    "components.controls.inline.bold": "Bold",
    "components.controls.inline.italic": "Italic",
    "components.controls.inline.underline": "Underline",
    "components.controls.inline.strikethrough": "Strikethrough",
    "components.controls.inline.monospace": "Monospace",
    "components.controls.inline.superscript": "Superscript",
    "components.controls.inline.subscript": "Subscript",
  
    // Link
    "components.controls.link.linkTitle": "リンク名",
    "components.controls.link.linkTarget": "リンク先の名前",
    "components.controls.link.linkTargetOption": "クリック時に新しいタブを開く",
    "components.controls.link.link": "Link",
    "components.controls.link.unlink": "Unlink",
  
    // List
    "components.controls.list.list": "List",
    "components.controls.list.unordered": "Unordered",
    "components.controls.list.ordered": "Ordered",
    "components.controls.list.indent": "Indent",
    "components.controls.list.outdent": "Outdent",
  
    // Remove
    "components.controls.remove.remove": "Remove",
  
    // TextAlign
    "components.controls.textalign.textalign": "Text Align",
    "components.controls.textalign.left": "Left",
    "components.controls.textalign.center": "Center",
    "components.controls.textalign.right": "Right",
    "components.controls.textalign.justify": "Justify"
};

export default connect(null, actions)(DraftArea);