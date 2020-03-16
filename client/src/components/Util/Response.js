import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import PropTypes from "prop-types"

import * as actions from "../../actions"

import ShowMore from "./ShowMore"
import Emoji from "./Emoji"
import Star from "./Star"

let ct = 0;

class Response extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showEmoji: false,
            showMore: false,
            showStar: false,
            chosenEmoji: null,
            madeStarAction: false,
            madeEmojiAction: false,
        }
        this.emojiRef = React.createRef();
        this.actionRef = React.createRef();
    }

    componentDidMount() {
        // こいつが５回もコールされてるから、グローバルカウンターで一回にしてる
        // もし既にfetchuserがcallされていてこのcomponentに戻ってきた場合はtrueになる => componentDidUpadateが通用しない
        if(this.props.auth.loggedIn && (ct == 0)) {
            this.props.fetchUser()
            this.setUpdater() 
            ct++
        }
    }

    handleWindowClose = () => {
        if(this.state.madeStarAction) {
            axios.post(`/api/post/${this.props.postId}/star`, {like: this.state.showStar})
        }
        if(this.state.madeEmojiAction) {
            axios.post(`/api/post/${this.props.postId}/emoji`, {emoji: this.state.chosenEmoji})
        }
    }

    setUpdater = () => {

        window.addEventListener("beforeunload", this.handleWindowClose);

        this.autoUpdate = setInterval(() => {
            if (this.state.madeStarAction) {
                
                axios.post(`/api/post/${this.props.postId}/star`, {like: this.state.showStar})
                .then(()=>{
                    this.setState({
                        madeStarAction: false,
                    })
                })
                .catch(err => {
                    console.log(err)
                })

            }

            if (this.state.madeEmojiAction) {
                axios.post(`/api/post/${this.props.postId}/emoji`, {emoji: this.state.chosenEmoji})
                .then(()=>{
                    this.setState({
                        madeEmojiAction: false,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }, 5000)
    }

    componentDidUpdate(prevProps) {

        if(prevProps.isOpened && !this.props.isOpened) {
            this.setState({
                showMore: false,
                showEmoji: false,
            })
        }

        if (this.state.showEmoji || this.state.showMore) {
            document.addEventListener("mousedown", this.outsideClick)
        } else {
            document.removeEventListener("mousedown", this.outsideClick)
        }

        // 初期のfetchUserだとloggedInはfalseからtrueに変わる。
        // componentDidMountでやれるのではないかと思うが、reduxのためできない => mountまでにpropsがupdateされない
        if (!prevProps.auth.loggedIn && this.props.auth.loggedIn){
            this.props.fetchUser()
            this.setUpdater()
        }

        if (prevProps.auth.info.likedPost !== this.props.auth.info.likedPost){
            const ls = this.props.auth.info.likedPost;
            var liked = false;
            for(var i = 0; i < ls.length; i++) {
                if(ls[i].post === this.props.postId) {
                    liked = true
                    break
                };
            };
            this.setState({ showStar: liked })
        }

        if (prevProps.auth.info.postRating !== this.props.auth.info.postRating){
            const ls = this.props.auth.info.postRating;
            var rate = null;
            for(var j = 0; j < ls.length; j++) {
                if(ls[j].post === this.props.postId) {
                    rate = ls[j].rate;
                    break
                };
            };
            this.setState({ chosenEmoji: rate })
        }
    }

    componentWillUnmount() {

        ct = 0;

        if (!this.props.skeleton && this.props.auth.loggedIn){
            if(this.state.madeStarAction) {
                axios.post(`/api/post/${this.props.postId}/star`, {like: this.state.showStar})
            }
            if(this.state.madeEmojiAction) {
                axios.post(`/api/post/${this.props.postId}/emoji`, {emoji: this.state.chosenEmoji})
            }
            window.removeEventListener("beforeunload", this.handleWindowClose);
        }

        document.removeEventListener("mousedown", this.outsideClick)
       
        clearInterval(this.autoUpdate)
    }

    outsideClick = (e) => {
        if(this.emojiRef.current.contains(e.target)) {
            return null;
        }

        if(this.actionRef.current.contains(e.target)) {
            return null;
        }

        this.setState({
            showEmoji: false,
            showMore: false,
        })
    }

    handleNoAuthClick = (e) => {
        e.preventDefault()
        this.props.showLogin()
        this.props.enableGray()
    }

    handleStarClick = (e) => {
        e.preventDefault()

        // わかりやすければtertiaryに
        if (!this.state.showStar) {
            this.setState({
                showStar: true,
                madeStarAction: true,
            })
        } else {
            this.setState({
                showStar: false,
                madeStarAction: true,
            })
        }
    }

    handleResponseClick = (e) => {
        e.preventDefault()
        this.setState({showMore: false})
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    }

    handleEmojiClick = (e, id) => {
        e.preventDefault()
        this.setState({
            chosenEmoji: id,
            madeEmojiAction: true,
        })
        this.setState({
            showEmoji: false
        })
    }

    handleMoreClick = (e) => {
        e.preventDefault()
        this.setState({showEmoji: false})
        this.setState({
            showMore: !this.state.showMore
        })
    }

    deletePost = () => {
        this.setState({showMore: false})
        const id = this.props.postId;
        const action = "POST_DELETE"
        const title = "ポストを削除";
        const caution = ""
        const message = "このポストを削除してもよろしいですか？";
        const buttonMessage = "削除する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage)
        this.props.enableGray()
    }

    reportPost = () => {
        this.setState({showMore: false});
        const id = this.props.postId;
        const action = "GIVE_FEEDBACK";
        const title = "このポストへのフィードバック";
        const message = "このポストについてどう思いましたか？";
        const caution = "（このフィードバックは匿名で保存されます。）";
        const buttonMessage = "送信する";
        this.props.showConfirmation(id, action, title, caution, message, buttonMessage);
        this.props.enableGray();
    };

    render() {
        return (
            <div style={this.props.wrapperStyle}>
                <Star
                    show={this.state.showStar}
                    handleClick={this.props.auth.loggedIn ? this.handleStarClick : this.handleNoAuthClick}
                    shadow={true}
                />
                <Emoji
                    ref={this.emojiRef}
                    handleResponseClick={this.props.auth.loggedIn ?this.handleResponseClick : this.handleNoAuthClick}
                    handleEmojiClick={this.handleEmojiClick}
                    chosenEmoji={this.state.chosenEmoji}
                    showEmoji={this.state.showEmoji}
                    shadow={true}
                />
                <ShowMore
                    ref={this.actionRef}
                    handleClick={this.props.auth.loggedIn ? this.handleMoreClick : this.handleNoAuthClick}
                    show={this.state.showMore}
                    left="-110px"
                    bottom="23px"
                    actionName={["フィードバックをする", "この投稿を削除する"]}
                    action={[this.reportPost, this.deletePost]}
                    shadow={true}
                />
            </div>
        )
    }
}


Response.propTypes = {
    postId: PropTypes.string,
    wrapperStyle: PropTypes.object,

}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Response)