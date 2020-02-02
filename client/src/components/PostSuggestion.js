import React, { Component } from "react";

import "./PostSuggestion.css"
import { IoMdStar } from "react-icons/io"
import { FaUserCheck } from "react-icons/fa"

class PostSuggestion extends Component {

    renderLevel = () => {
        switch(this.props.suggestion.editLevel){
            //今はいらない
            // case "yellow":
            //     return <div className="post-suggestion-level-yellow"/>
            // case "green":
            //     return <div className="post-suggestion-level-green"/>
            // case "blue":
            //     return <div className="post-suggestion-level-blue"/>
            // case "red":
            //     return <div className="post-suggestion-level-red"/>
            default:
                return null
        }
    }

    render () {

        const { suggestion } = this.props

        return (
            <div>
                <div className="post-suggestion">
                    <div className="post-suggestion-row">
                        <div className="post-suggestion-left">
                            <p className="post-suggestion-index">
                            { 
                            suggestion.index.map(idx => {
                                return idx + "."
                            })
                            }
                            </p>
                        </div>
                        <div className="post-suggestion-middle">
                            <p className="post-suggestion-title">{suggestion.title}</p>
                            <div className="post-suggestion-bottom">
                                <IoMdStar className="post-suggestion-star"/>
                                <p className="post-suggestion-likes">{suggestion.likes}</p>
                                <p className="post-suggestion-edit">最後の編集日:</p>
                                <p className="post-suggestion-date">{suggestion.lastEdited}</p>
                            </div>
                        </div>
                        <div className="post-suggestion-level">
                            {this.renderLevel()}
                        </div>
                        { suggestion.permission
                        ? <FaUserCheck className="post-suggestion-permission" />
                        : ""
                        }
                        <img className="post-suggestion-right" src={suggestion.imgUrl}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostSuggestion