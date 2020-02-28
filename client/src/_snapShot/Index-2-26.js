import React, { Component, PureComponent } from "react"
import { ObjectID } from "bson"
import { connect } from "react-redux"
import styled from "styled-components"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { GoPlusSmall } from "react-icons/go"

import { Box, BoxTransition, ButtonWrapper, ButtonLeft, ButtonRight, RevertBtn, AddBtn } from "../../Element/Element"
import { Space } from "../../../Theme"

import { sendMessage } from "../../../Util/util"

import * as actions from "../../../../actions"

// import InitialData from "./InitialData"
import Column from "./Column"

const Wrapper = styled.div`
    position: relative;
    margin-top: 5px;
`

const Container = styled.div`
    display: flex;
    height: 350px;
`

const IndexBox = styled.div`
    position: absolute;
    width: 760px;
    margin-left: -160px;
    overflow: scroll;
`

class InnerList extends PureComponent {
    render () {
        const { column, postMap, index } = this.props;
        const posts = column.posts.map(id => arrObjLookUp(postMap, "_id", id));
        return <Column column={column} posts={posts} index={index}/>
    }
}

function arrObjLookUp(obj, field, attr){
    for(var i=0; i < obj.length; i++){
        if(obj[i][field] === attr){
            return obj[i]
        }
    }
    return
}

class EditIndexTopic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            columns: [],
            order: [],
        }
    }

    componentDidMount() {
        this.setState({
            posts: this.props.initialVal1,
            columns: this.props.initialVal2,
            order: this.props.initialVal3,
        })
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.columnName !== this.props.columnName){
            this.addNewIndex()
        }
    }

    sortColumnSwap = (newColumnOrder, start, end) => {

        // 動かした対象のColumnのPostsをUpdate
        const targetResult = this.createNewIndexes(end, 0, 0, start)

        var columnStore = []
        var postStore = []

        if (end > start) {
            // eg) start => 0, end => 3の場合は、1~3の計3つのcolumnが１下がる
            for(var i = start+1; i <= end; i++){
                const restColumnId = this.state.order[i]
                const restIndex = arrObjLookUp(this.state.columns, "_id", restColumnId).index
                const restResult = this.createNewIndexes(restIndex, -1, 0, i)
                columnStore.push(restResult[0])
                postStore.push(restResult[1][0]) // arrayを解体する必要がある
            }

            columnStore.push(targetResult[0])
            postStore.push(targetResult[1][0])
    
        } else if(start > end) {
            // eg) start => 3, end => 0の場合は、0~2の計3つのcolumnが１上がる

            columnStore.push(targetResult[0])
            postStore.push(targetResult[1][0])

            for(var j = end; j <= start-1; j++){
                const restColumnId = this.state.order[j]
                const restIndex = arrObjLookUp(this.state.columns, "_id", restColumnId).index
                const restResult = this.createNewIndexes(restIndex, 1, 0, j)
                columnStore.push(restResult[0])
                postStore.push(restResult[1][0])
            }
        }

        const oldColumn = Array.from(this.state.columns)
        const oldPost = Array.from(this.state.posts)

        const combinedColumns = []

        var ct = 0

        for (var k=0; k < oldColumn.length; k++) {
            if(start > end){
                if((end <= k) && (k <= start)) {
                    combinedColumns.push(columnStore[ct])
                    ct++
                    continue
                }
                combinedColumns.push(oldColumn[k])
            } else if(end > start) {
                if((start <= k) && (k <= end)) {
                    combinedColumns.push(columnStore[ct])
                    ct++
                    continue
                }
                combinedColumns.push(oldColumn[k])
            }
        }

        var foundPost = {}

        for (var l=0; l < oldPost.length; l++) {
            foundPost = arrObjLookUp(postStore, "_id", oldPost[l]._id)
            if(!!foundPost){
                oldPost[l] = foundPost
                continue
            } 
        }

        this.setState({
            columns: combinedColumns,
            posts: oldPost,
            order: newColumnOrder,
        })
    }
    
    // Level => [1,4]だったらLevel0は1のことを指す
    createNewIndexes = (baseIndex, valueToChange, level, columnIndex) => {
    
        const columnId = this.state.order[columnIndex]
        const column = arrObjLookUp(this.state.columns, "_id", columnId)
        const postIds = column.posts // このColumnに属するpost
    
        var newPosts = []
        var post = {}
        var postFound = {}
    
        postIds.forEach(id => {
            postFound = arrObjLookUp(this.state.posts, "_id", id)
            post = Object.assign({}, postFound)
            post.index[level] = baseIndex + valueToChange
            newPosts.push(post)
        }) 

        // 変更のないpostをnewPostsに全て追加する
        for(var i=0; i < this.state.posts; i++){
            if(!postIds.includes(this.state.posts[i]._id)){
                newPosts.push(this.state.posts[i]) 
            }
        }

        const newColumn = Object.assign({}, column)
        newColumn.index = baseIndex + valueToChange

        return [newColumn, newPosts]
    }

    findPostsAndIncrement = (startCond, endCond, lookUpIdList, incrementVal, storeArray) => {

        var targetPost = {}
        var newArray = {}

        for (var i=startCond; i<endCond; i++){
            targetPost = arrObjLookUp(this.state.posts, "_id", lookUpIdList[i])
            newArray = Object.assign({}, targetPost)
            newArray.index[1] = newArray.index[1]+incrementVal
            storeArray.push(newArray)
        }
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        ///////////////////////////////////
        // もし、Column同士を入れ替えた場合 //
        ///////////////////////////////////

        if(type === "column") {
            var newColumnOrder = Array.from(this.state.order);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            // 中のポストのIndexを直す
            this.sortColumnSwap(newColumnOrder, source.index, destination.index) 

            return;
        }

        const origin = arrObjLookUp(this.state.columns, "_id", source.droppableId)
        const target = arrObjLookUp(this.state.columns, "_id", destination.droppableId)

        ///////////////////////////////////
        // もし、同じColumnから持ってきた場合 //
        ///////////////////////////////////

        if(origin === target) {
            var postIds = Array.from(origin.posts);
            postIds.splice(source.index, 1); // 動かす前の位置をから消す
            postIds.splice(destination.index, 0, draggableId); // 新しい位置へと付け加える

            var newPosts = []
            var postId = ""
            // var targetPost = {}
            // var newArray = {}

            if (destination.index > source.index) {
                // 2{soure.index}を4{destination.index}の位置に持っていく場合は、前半（2~3）が-1され、4が3の値+1される

                this.findPostsAndIncrement(source.index, destination.index, postIds, -1, newPosts)

                // for (var i=source.index; i<destination.index; i++){
                //     postId = postIds[i]
                //     targetPost = arrObjLookUp(this.state.posts, "_id", postId)
                //     newArray = Object.assign({}, targetPost)
                //     newArray.index[1] = newArray.index[1]-1
                //     newPosts.push(newArray)
                // }
                
                postId = [draggableId]
                this.findPostsAndIncrement(0, 1, postId, destination.index - source.index, newPosts)

                // postId = draggableId
                // targetPost = arrObjLookUp(this.state.posts, "_id", postId)
                // newArray = Object.assign({}, targetPost)
                // newArray.index[1] = newArray.index[1] + destination.index - source.index
                // newPosts.push(newArray)

            } else if (destination.index < source.index) {
                // 4{soure.index}を2{destination.index}の位置に持っていく場合は、前半（2~3）が+1され、4が3の値+1される

                // postId = draggableId
                // targetPost = arrObjLookUp(this.state.posts, "_id", postId)
                // newArray = Object.assign({}, targetPost)
                // newArray.index[1] = newArray.index[1] + destination.index - source.index
                // newPosts.push(newArray)

                postId = [draggableId]
                this.findPostsAndIncrement(0, 1, postId, destination.index - source.index, newPosts)

                this.findPostsAndIncrement(destination.index+1, source.index+1, postIds, 1, newPosts)

                // for (var k=destination.index+1; k<=source.index; k++){
                //     postId = postIds[k]
                //     targetPost = arrObjLookUp(this.state.posts, "_id", postId)
                //     newArray = Object.assign({}, targetPost)
                //     newArray.index[1] = newArray.index[1]+1
                //     newPosts.push(newArray)
                // }
            }

            var ct = 0
            var newColumn = Object.assign({}, origin)

            for(var l=0; l < newColumn.posts.length; l++) {
                if(destination.index < source.index){
                    if((destination.index <= l) && (l <= source.index)) {
                        console.log(ct)
                        newColumn.posts[l] = newPosts[ct]._id
                        ct++
                        continue
                    }
                } else if(destination.index > source.index) {
                    if((source.index <= l) && (l <= destination.index)) {
                        newColumn.posts[l] = newPosts[ct]._id
                        ct++
                        continue
                    }
                }
            }

            var combinedColumns = Array.from(this.state.columns)
            var combinedPosts = Array.from(this.state.posts)
            var found = {}

            combinedColumns[source.droppableId] = newColumn

            for(var m=0; m < combinedPosts.length; m++){
                found = arrObjLookUp(newPosts, "_id", combinedPosts[m]._id)
                if(!!found) {
                    combinedPosts[m] = found
                }
            }

            this.setState({
                columns: combinedColumns,
                posts: combinedPosts,
            })

            return;
        }

        ///////////////////////////////////
        // もし、違うColumnから持ってきた場合 //
        ///////////////////////////////////

        // Sourceに残ったNodeのLogic
        const sourcePosts = Array.from(origin.posts); // 始めのColumn
        sourcePosts.splice(source.index, 1) 

        var found = {}
        // var newArray = {}
        var changed = []

        this.findPostsAndIncrement(source.index, sourcePosts.length, sourcePosts, -1, changed)

        // for(var o=source.index; o < sourcePosts.length; o++) {
        //     found = arrObjLookUp(this.state.posts, "_id", sourcePosts[o])
        //     newArray = Object.assign({}, found)
        //     newArray.index[1] = newArray.index[1] - 1
        //     changed.push(newArray)
        // }

        // SourceからTargetに追加されたNodeのロジック
        const temp = arrObjLookUp(this.state.posts, "_id", draggableId)
        const newAddedPost = Object.assign({}, temp)

        //挿入する位置の一つ前のものか、一番最初の場合は1
        var destinationIndex = -1
        const destinationPostId = target.posts[destination.index-1]
        if (destinationPostId) {
            destinationIndex = arrObjLookUp(this.state.posts, "_id", destinationPostId).index[1]  
        }

        newAddedPost.index[0] = target.index
        newAddedPost.index[1] = destinationIndex + 1

        changed.push(newAddedPost)

        // Targetに元々あるNodeのロジック
        var targetPosts = Array.from(target.posts); //　ターゲットのColumn
        targetPosts.splice(destination.index, 0, draggableId);

        this.findPostsAndIncrement(destination.index+1, targetPosts.length, targetPosts, 1, changed) // ここもしかたら最初のargの値違うかも

        // for(var p=destination.index+1; p < targetPosts.length; p++) { 
        //     found = arrObjLookUp(this.state.posts, "_id", targetPosts[p])
        //     newArray = Object.assign({}, found)
        //     newArray.index[1] = newArray.index[1] + 1
        //     changed.push(newArray)
        // }

        var combinedColumns = Array.from(this.state.columns)

        for(var q=0; q < combinedColumns.length; q++) {
            if(q === origin.index) {
                combinedColumns[q].posts = sourcePosts
            } else if(q === target.index) {
                combinedColumns[q].posts = targetPosts
            }
        }

        var combinedPosts = Array.from(this.state.posts)
        var found = {}

        for(var r=0; r < combinedPosts.length; r++){
            found = arrObjLookUp(changed, "_id", combinedPosts[r]._id)
            if(!!found) {
                combinedPosts[r] = found
            }
        }

        this.setState({
            columns: combinedColumns,
            posts: combinedPosts,
        })

    }

    showAddIndex = (e) => {
        e.preventDefault();
        const id = "1"; // falseじゃなければなんでもいい
        const action = "ADD_COLUMN";
        const title = "新しいコラムを追加する";
        const message = "主題のタイトルを入力してください。";
        const caution = "";
        const buttonMessage = "追加する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage);
        this.props.enableGray();
    }

    addNewIndex = () => {

        const _id = new ObjectID();

        const index = String(this.state.order.length)
        
        const newData = {
            _id,
            index,
            title: this.props.columnName,
            posts: []
        }

        const newColumns = Array.from(this.state.columns)
        newColumns.push(newData)

        const newColumnOrder = Array.from(this.state.order)
        newColumnOrder.push(_id)

        this.setState({
            order: newColumnOrder,
            columns: newColumns,
        })

        sendMessage("success", `コラム「${this.props.columnName}」を追加しました。`, 3000, this.props)
    }

    renderTask = () => {

        return (
            <Wrapper>
                <IndexBox>
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        <Droppable droppableId="all-columns" direction="horizontal" type="column">
                            {(provided) => (
                                <Container
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                {this.state.order
                                    .filter((_, index) => index !== 0)
                                    .map((columnId, index) => {
                                        const column = arrObjLookUp(this.state.columns, "_id", columnId);
                                        return (
                                            <InnerList
                                                key={columnId}
                                                column={column}
                                                postMap={this.state.posts}
                                                index={index}
                                            />
                                        )
                                    })
                                }
                                {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    </DragDropContext>
                </IndexBox>
            </Wrapper>
        )
    }

    handleRevert = () => {

        // 確認メッセージを最初に送る => reduxで変更して、componentDidUpdateで受け取る

        this.setState({
            posts: this.props.initialVal1,
            columns: this.props.initialVal2,
            order: this.props.initialVal3,
        })
    }

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(2);
    }  

    handleForward = () => {
        this.props.setBackward(false);
        this.props.setStep(4);
        this.props.setIndex(this.state.index);
    }

    render() {

        return (
            
            <Box scroll={true}>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        <p>4. トピックの目次を編集</p>
                        <RevertBtn　onClick={this.handleRevert}>元に戻す</RevertBtn>
                        <AddBtn onClick={(e) => this.showAddIndex(e)}>
                            <GoPlusSmall/>コラムを追加
                        </AddBtn>
                    </div> 

                    { this.state.posts[0] && this.renderTask() }

                    <Space height={"360px"}/>

                    <ButtonWrapper>
                        <ButtonLeft onClick={this.handleBack}>戻る</ButtonLeft>
                        <ButtonRight onClick={this.handleForward}>次へ進む</ButtonRight>
                    </ButtonWrapper>
                    
                    <Space height={"220px"}/>

                </BoxTransition>
            </Box>
        )
    }
}

function mapStateToProps(state) {
    return {
        columnName: state.index.columnName,
    }
}

export default connect(mapStateToProps, actions)(EditIndexTopic)