import React, { Component } from "react"
import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd"

const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? "lightgreen" : "white")};

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
                        <p>
                            {this.props.task.index.map((ind) => {
                                return ind + "."
                            })}
                        </p>
                        <p>Original: {this.props.task.content}</p>
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Task