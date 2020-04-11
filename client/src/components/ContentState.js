import React, { useMemo, useRef, useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import equal from "deep-equal"

import * as actions from "../actions"

import DraftEditor from "./Draft/Editor/Editor"
import Draft from "./Draft/Draft"

// これは書いてる途中は毎回リセットされるから、書き込みが終わってdelay後にcallback
const useInterval = (callback, delay, condition) => {
    const savedCallback = useRef();
  
    useEffect(() => {
        savedCallback.current = callback;
    });
  
    useEffect(() => {
        var id;

        if(checkCondition(condition)){
            id = setInterval(() => {
                savedCallback.current();
            }, delay);
        }

        return () => clearInterval(id);
    }, [delay, condition]);
}

const updateContentArr = (contentArr, idToUpdate, newContent, postAction) => {
    const newObj = JSON.parse(JSON.stringify(contentArr))

    for(var i=0; i < newObj.length; i++){
        if(newObj[i].id === idToUpdate){        
            if(!newContent) {
                newObj.splice(i, 1)
                postAction(newObj)
                return
            }
            newObj[i].id = idToUpdate
            newObj[i].content = newContent
            postAction(newObj)
            return
        }
    }
    newObj.push({id:idToUpdate, content: newContent})
    postAction(newObj)
}

const checkCondition = (condArr) => {
    return condArr.filter(elem => !elem).length === 0
}

const WrappedEditorRoute = ({ loggedIn, draftArr, ...props }) => {

    const [updatedCt, setUpdatedCt] = useState(0)
    const [contentArr, setContentArr] = useState([]) // contentArr :: [{id: string, timeStamp: date, content: obj}]

    const updateCondition = useMemo(() => { return [loggedIn, !!draftArr.length, !!contentArr.length]}, [loggedIn, draftArr.length, contentArr])

    useInterval(() => getDiff(contentArr, draftArr, true), 3000, updateCondition)

    const getDiff = async (afterArr, beforeArr, setCt) => {
        if(!checkCondition(updateCondition)) return

        var id, content, res;

        for(var i=0; i < beforeArr.length; i++) {
            id = beforeArr[i]._id
            content = beforeArr[i].content
            for(var j=0; j < afterArr.length; j++) {
                if(id === afterArr[j].id){
                    if(afterArr[j].content && !equal(content, afterArr[j].content)){
                        res = await props.draftOneUpdate(afterArr[j].id, afterArr[j].content, Date.now())
                        if(res) { 
                            updateContentArr(afterArr, afterArr[j].id, undefined, setContentArr);
                            if(setCt){
                                setUpdatedCt(1); 
                                setTimeout(() => { setUpdatedCt(0) }, 4000) // updateしましたのメッセージを消すため。childrenとのdependencyがあるのでこれは後で変える消べき
                            } else {
                                setUpdatedCt(0)
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <>
            <Route 
                path="/draft/edit/:id" 
                render={() => 
                <DraftEditor 
                    updatedCt={updatedCt} 
                    setUpdatedCt={setUpdatedCt} 
                    updateContentArr={(idToUpdate, newContent) => 
                        updateContentArr(contentArr, idToUpdate, newContent, setContentArr)
                    } 
                />} 
            />
            <Route 
                exact 
                path="/draft" 
                render={() => loggedIn ? <Draft updateContentImmediate={() => { getDiff(contentArr, draftArr) }}/> : <Redirect to="/"/>} 
            />
        </>
    )
}

function mapStateToProps({ auth, draft }){
    return {
        loggedIn: auth.loggedIn,
        draftArr: draft.onEdit,
    }
}

export default connect(mapStateToProps, actions)(WrappedEditorRoute)