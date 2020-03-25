import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom"
import equal from "deep-equal"

import Message from "./Util/Message"
import Filter from "./Util/Filter"
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import Auth from "./Auth/Auth"
import Confirm from "./Confirm/Confirm"

import * as actions from "../actions"

const authList = ["SIGN_UP", "LOG_IN"]

const ConfirmWrapper = React.forwardRef((props, ref) => (
     <Confirm innerRef={ref} {...props}/>
))

const AuthWrapper = React.forwardRef((props, ref) => (
    <Auth innerRef={ref} {...props}/>
))

class AppState extends Component {

    constructor(props) {
        super(props)
        this.confirmRef = React.createRef()
        this.authRef = React.createRef()
    }

    componentDidMount() {
        this.props.fetchUser();

        if(this.props.auth.loggedIn && !this.autoUpdate){
            this.setUpdater()
        }
    }

    setUpdater = () => {
        this.autoUpdate = setInterval(() => {
    
            this.sendDiff("POST_STAR", "INDII_POST_STAR", this.props.auth.info.likedPost, "post", ["post"])
            this.sendDiff("POST_EMOJI", "INDII_POST_EMOJI", this.props.auth.info.postRating, "post", ["post", "rate"])
            this.sendDiff("TOPIC_LIKE", "INDII_TOPIC_LIKE", this.props.auth.info.likedTopic, "topic", ["topic"])

        }, 5000)
    }

    sendDiff = (type, storageName, intialVal, idLookUp, lookUpArr) => {
        var changedArr, diff;

        const changed = localStorage.getItem(storageName)

        try {
            changedArr = JSON.parse(changed)
        } catch (e) {
            console.log(e)
        }

        if(changed && !equal(intialVal, changedArr)){ // もしtoggleした場合は_idが追加されないので!equalになる
            diff = this.getDiff(intialVal, changedArr, lookUpArr) 
            if(diff){ // そのため、diffが本当に揃っているかを確認する分岐が必要
                this.props.saveAsync(type, diff, idLookUp)
            }
        } 
    }

    // こいつの呼ばれる回数が異常（arr.lengthが2で8msかかる）
    getDiff = (initial, changed, lookUpArr) => {
        var i, j;

        var tempInitial = initial.slice();
        var tempChanged = changed.slice();

        const checkDif = (initial, changed, lookUpArr) => {
            var isDifferent = false;
            for(let i=0; i < lookUpArr.length; i++){
                if(initial[lookUpArr[i]] !== changed[lookUpArr[i]]){
                    isDifferent = true;
                    break
                }
            }
            return isDifferent
        }

        if(initial.length >= changed.length) {
            for(i=0; i < initial.length; i++){
                for(j=0; j < changed.length; j++){
                    if(!(checkDif(initial[i], changed[j], lookUpArr))){
                        tempInitial[i] = false;
                        tempChanged[j] = false;
                        continue
                    }
                }
            }
        } else {
            for(i=0; i < changed.length; i++){
                for(j=0; j < initial.length; j++){
                    if(!(checkDif(initial[j], changed[i], lookUpArr))){
                        tempChanged[i] = false;
                        tempInitial[j] = false;
                        continue
                    }
                }
            }
        }

        const removed = tempInitial.filter(temp => temp !== false)
        const added = tempChanged.filter(temp => temp !== false)

        if(removed.length === 0 && added.length === 0) return null

        return {
            removed,
            added,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.update.confirmation.on || this.props.auth.showForm) {
            document.addEventListener("mousedown", this.outsideClick)
        } else {
            document.removeEventListener("mousedown", this.outsideClick)
        }

        if((prevProps.auth.logInError === null) && (this.props.auth.logInError === false)) {
            this.props.hideLogin();
        }

        if(!prevProps.auth.loggedIn && this.props.auth.loggedIn){
            this.setUpdater()
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
        clearInterval(this.autoUpdate)
    }

    outsideClick = (e) => {

        if(this.props.auth.showForm) {
            if(this.authRef && this.authRef.current && this.authRef.current.contains(e.target)) { // 何故だかたまにthis.authRefが関係ない時にundefinedになってエラーになるからthis.authRefを追加
                return;
            }
            this.props.hideLogin();
        }

        if(this.props.update.confirmation.on) {
            if(this.confirmRef.current.contains(e.target)) {
                return;
            } 
            this.props.hideConfirmation();
        }
        this.props.disableGray();        
    }


    // shouldProeed => trueで指定されたactionを行う, falseでキャンセル
    // acion(任意) => reduxに頼らず actionをset
    // value(任意) => reduxに頼らず actionをset
    postAction = (shouldProceed, _action, _value) => {

        var conf = this.props.update.confirmation

        var {
            id,
            action,
            problem1, problem2, problem3, problem4, problem5,
            value,
            draftId,
            index,
        } = conf

        if(_action){ action = _action }
        if(_value){ value = _value }

        // 初期に共通して行うこと
        if(!authList.includes(action)) {
            this.props.hideConfirmation();
        }

        if (shouldProceed) {
            switch(action){

                // ======== Confirm(PopUp)関係 ==========
    
                case "POST_DELETE":
                    this.props.deletePost(id); return
    
                case "GIVE_FEEDBACK":
                    this.props.sendFeedBack(id, {problem1, problem2, problem3, problem4, problem5}); return
    
                case "CHANGE_DRAFTNAME":
                    this.props.changeDraftName(id, "", true); return 
                
                case "CHANGE_TAG":
                    this.props.changeTag(id, "", true); return
    
                case "CHANGE_DRAFTCONFIG":
                    this.props.changeDraftConfig(id, value); return
    
                case "REVERT_IMG":
                    this.props.revertImg(true); return
    
                case "ADD_COLUMN":
                    this.props.addColumn(value); this.props.updateMessage("success", "コラムを削除しました。"); return
    
                case "REVERT_COLUMN":
                    this.props.revertColumn(true); return
    
                case "DELETE_COLUMN":
                    this.props.deleteColumn(id); return
    
                case "DRAFT_DELETE_CHECK":
                    this.props.deleteDraft(draftId); return
    
                case "DRAFT_UPLOAD_CHECK":
                    this.props.uploadDraft(index); return

                case "CONFIRM_DRAFT":
                    this.props.confirmDraft(value); this.props.history.push("/notification"); return
    
                case "DELETE_REF":
                    this.props.deleteRef(id); return
    
                case "SELF_EDIT":
                    this.props.updateProfile(id, value); return
    
                case "SELF_IMAGE":
                    this.props.updateImage(id, value); return

                case "ADD_TALK_CONFIRM":
                    this.props.createTalk(conf.talkId, conf.type, conf.talkTitle, conf.talkDesc); return
                
                case "DRAFT_ADD_URL":
                    this.props.draftAddUrl(value); return;

                case "DRAFT_ADD_KATEX":
                    this.props.draftAddKatex(value); return;
                
                case "TALK_EDIT":
                    this.props.editTalkDesc(id, value); return

                case "TALK_DELETE":
                    this.props.deleteTalk(id); return

                // ======== logIn系 ==========
    
                case "SIGN_UP":
                    this.props.signUp(value); return 
    
                case "LOG_IN":
                    this.props.logIn(value); return
    
                default: 
                    this.props.endAction(); return
            }
        }
        this.props.endAction();
    }

    renderMessage = () => {

        const { type, message } = this.props.update.updateMessage

        switch(type){
            case "success":
                return <Message type={"SUCCESS"} message={message}/>
            case "fail":
                return <Message type={"FAIL"} message={message}/>
            default:
                return;
        }
    }


    render () {

        const { update, auth, children } = this.props

        return (
            <Box>
                <Header/>
                <Navigation/>
                <Message/>
                <ConfirmWrapper
                    ref={this.confirmRef}
                    postAction={this.postAction}
                />
                
                { !auth.loggedIn &&
                <AuthWrapper 
                    ref={this.authRef} 
                    postAction={this.postAction}
                /> 
                }

                { update.fetching && <Loading/>}
                { update.grayBackground && <Filter/>}

                { children }

            </Box>
        )
    }
}

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "40%",
    zIndex: 100,
  },
}));


function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress color="primary"/>
        </div>
    )
}

const Box = styled.div`
    height: 100%;
`

function mapStateToProps({ update, auth }){
    return {
        update,
        auth,
    }
}

export default connect(mapStateToProps, actions)(withRouter(AppState))