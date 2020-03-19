import React, { Component } from "react"
import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd"

import { FaUserCheck } from "react-icons/fa"

import { fmtDate } from "../../../../../Util/util"

import star_pressed from "../../../../../../images/star-pressed.png"

const PermissionIcon = styled(FaUserCheck)`
    transform: scale(1.0);
    margin-right: 7px;
    margin-top: -1px;
    color: #9EAEE5;
`

const Container = styled.div`
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    padding: 5px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? "#F8F8F8" : "white")};
`

class Post extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.post._id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <div style={{display: `flex`, position: `relative`}}>
                            <div>
                                <p style={{fontSize: `12px`, marginBottom: "4px"}}>
                                    {this.props.post.index.join(".")}
                                    <span style={{marginRight: "8px"}}/>
                                    {this.props.post.postName}
                                </p>
                                <div style={{display: "flex", alignItems: "center", width: "152px"}}>
                                    <div>
                                        <p style={{fontSize: "10px"}}>{this.props.post.lastEdited ? fmtDate(this.props.post.lastEdited) : "-"}</p>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center", marginLeft: "auto"}}>
                                        {!this.props.post.config.allowEdit ? "" : <PermissionIcon/>}
                                        <img src={star_pressed} style={{
                                            width: `10px`,
                                            height: `10px`, 
                                            marginTop: "-2px",
                                            marginRight: "4px",
                                        }}/>
                                        <p style={{ width: "22px", fontSize: "10px"}}>
                                            {this.props.post.star.counter}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img src={this.props.post.postImg ? this.props.post.postImg.image : this.props.post.topicSquareImg.image} style={{
                                width: `38px`,
                                height: `38px`, 
                                position: `absolute`, 
                                right: `0px`,
                                top: "0px",
                            }}/>
                        </div>
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Post