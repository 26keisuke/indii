import React, { Component, PureComponent } from "react"
import styled from "styled-components"
import Task from "./Task"
import { Droppable, Draggable } from "react-beautiful-dnd"

const Container = styled.div`
    margin: 8px;
    flex-shrink: 0;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    padding: 8px;
    font-size: 13px;
    font-weight: normal;
    margin-top: 5px;
    margin-bottom: 0px;
    margin-left: 8px;
    margin-right: 8px;
    border-bottom: 1px solid rgba(210,210,210,0.3);
`

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? "rgba(233, 233, 238, 0.50)" : "#fdfdfd")};
    min-height: 100px;
    flex-grow: 1;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 0px !important;
    }
`

class InnerList extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return this.props.tasks.map((task,index) => (
            <Task key={task.id} task={task} index={index}/>
        ))
    }
}

class Column extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Draggable
                draggableId={this.props.column.id}
                index={this.props.index}
            >
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>{this.props.column.column}　{this.props.column.title}</Title>
                    <Droppable droppableId={this.props.column.id} type="task">
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerList tasks={this.props.tasks}/>
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
            </Draggable>
        )
    }
}

export default Column
