import React, { Component, } from "react"
import styled from "styled-components"
import Post from "../Post/Post"
import { Droppable, Draggable } from "react-beautiful-dnd"
import ShowMore from "../../../../../Util/ShowMore"
import { GiHamburgerMenu } from "react-icons/gi"
import { Space } from "../../../../../Theme" 

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

const Title = styled.div`
    height: 36px;
    font-size: 13px;
    font-weight: normal;
    margin-top: 5px;
    margin-bottom: 0px;
    margin-left: 8px;
    margin-right: 8px;
    border: none;
    border-bottom: 1px solid rgba(210,210,210,0.3);

    display: flex;
    align-items: center;

    & > p {
        margin-right: 5px;
        margin-left: 3px;
        margin-top: -3px;
    }

    & > input {
        font-size: 12px;
        margin-right: 8px;
        width: 130px;
        box-sizing: border-box;
        height: 26px;
        border: none;
        resize: none;
        text-overflow: ellipsis;
        margin-top: -5px;

        &:focus {
            border: 1px solid royalblue;
            outline: none;
            cursor: text;
            overflow: hidden;
            margin-top: -2px;
        }
        
    }
`

const PostList = styled.div`
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

const ShowMoreWrapper = styled.div`
    z-index: 1;
    transform: scale(0.8);
    margin-right: 18px;
`

const DragArea = styled(GiHamburgerMenu)`
    transform: scale(1.3);
    margin-top: -5px;
    color: #636480;

`

//　ここもdeep comparisonのためPureComponentじゃなくした
class InnerList extends Component {
    render() {
        return this.props.posts.map((post,index) => (
            <Post key={post._id} post={post} index={index}/>
        ))
    }
}

class Column extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpened: false,
        }
        this.columnRef = React.createRef()
    }

    componentDidUpdate() {
        if (this.state.isOpened) {
            document.addEventListener("mousedown", this.outsideClick)
        } else {
            document.removeEventListener("mousedown", this.outsideClick)
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
    }

    outsideClick = (e) => {
        if (this.columnRef.current.contains(e.target)) {
            return
        }

        this.setState({
            isOpened: false,
        })
    }

    handleClick = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        })
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.column._id}
                index={this.props.index}
            >
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>
                        <p>{this.props.column.index}</p>
                        <input 
                            onChange={(e) => this.props.handleChange(this.props.column.index, e.target.value)}
                            value={this.props.column.title}
                        />
                        { this.props.posts.length === 0 
                        ?
                        <ShowMoreWrapper>
                            <ShowMore
                                ref={this.columnRef}
                                hover={false}
                                handleClick={this.handleClick}
                                show={this.state.isOpened}
                                shadow={false}
                                left="-157px"
                                bottom="-38px"
                                actionName={["このコラムを削除する"]}
                                action={[() => this.props.handleDelete(this.props.column._id, this.props.column.title)]}
                            />
                        </ShowMoreWrapper>
                        :
                        <Space width={30}/>
                        }
                        <DragArea/>
                    </Title>
                    <Droppable droppableId={this.props.column._id} type="task">
                        {(provided, snapshot) => (
                            <PostList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerList posts={this.props.posts}/>
                                {provided.placeholder}
                            </PostList>
                        )}
                    </Droppable>
                </Container>
            )}
            </Draggable>
        )
    }
}

export default Column
