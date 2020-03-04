import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Message from "./Util/Message"
// import Loading from "./Util/Loading"
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
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
    }

    outsideClick = (e) => {

        if(this.props.auth.showForm) {
            if(this.authRef.current.contains(e.target)) {
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


    // こいつを分離しようと思えばできるが、こっちの方がlookupしやすい（人間的に）
    postAction = (shouldProceed) => {

        const {
            id,
            action,
            problem1, problem2, problem3, problem4, problem5,
            value,
            draftId,
            index,
        } = this.props.update.confirmation

        // 初期に共通して行うこと
        if(authList.includes(action)){
            this.props.isFetching()
        } else {
            this.props.hideConfirmation();
        }

        if (shouldProceed) {
            switch(action){

                // ======== Confirm(PopUp)関係 ==========
    
                case "POST_DELETE":
                    this.props.deletePost(id); break
    
                case "GIVE_FEEDBACK":
                    this.props.sendFeedBack(id, {problem1, problem2, problem3, problem4, problem5}); break
    
                case "CHANGE_DRAFTNAME":
                    this.props.changeDraftName(id, "", true); break 
    
                case "CHANGE_DRAFTCONFIG":
                    this.props.changeDraftConfig(id, value); break
    
                case "REVERT_IMG":
                    this.props.revertImg(true); break
    
                case "ADD_COLUMN":
                    this.props.addColumn(value); break
    
                case "REVERT_COLUMN":
                    this.props.revertColumn(true); break
    
                case "DELETE_COLUMN":
                    this.props.deleteColumn(id); break
    
                case "DRAFT_DELETE_CHECK":
                    this.props.deleteDraft(draftId); break
    
                case "DRAFT_UPLOAD_CHECK":
                    this.props.uploadDraft(index); break
    
                case "DELETE_REF":
                    this.props.deleteRef(id); break
    
                case "SELF_INTRO":
                    this.props.updateIntro(id, value); break
    
                case "SELF_IMAGE":
                    this.props.updateImage(id, value); break
    
                // ======== logIn系 ==========
    
                case "SIGN_UP":
                    this.props.signUp(value); return 
    
                case "LOG_IN":
                    this.props.logIn(value); return
    
                default: break
            }
        }

        this.props.endFetching(); // 別にisFetchingされていなくても大したperformanceのコストにはならん。いちいちどれがisFetchingしたか考えるのだるいし
        this.props.disableGray();
    }

    renderMessage = () => {

        const { type, message } = this.props.update.updateMessage

        switch(type){
            case "success":
                return (
                    <Message type={"SUCCESS"} message={message}/>
                )
            case "fail":
                return (
                    <Message type={"FAIL"} message={message}/>
                )
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

export default connect(mapStateToProps, actions)(AppState)