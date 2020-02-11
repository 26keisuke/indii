import React, { Component } from "react"
import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd"

const Container = styled.div`
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    padding: 5px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? "#F8F8F8" : "white")};
`

class Task extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <div style={{display: `flex`, position: `relative`}}>
                            <div>
                                <p style={{fontSize: `12px`}}>
                                    {this.props.task.index.map((ind) => {
                                        return ind + "."
                                    })}
                                </p>
                                <p>
                                    <span style={{color: `#777777`, fontSize: '10px'}}>
                                        Title:
                                    </span> 
                                    {this.props.task.content}
                                </p>
                            </div>
                            <img src={this.props.task.imgUrl} style={{
                                width: `31px`,
                                height: `31px`, 
                                position: `absolute`, 
                                right: `0px`
                            }}/>
                        </div>
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Task