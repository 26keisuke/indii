import React, { useRef, useState, useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../actions"

import ShowMore from "./ShowMore"
import Emoji from "./Emoji"
import Star from "./Star"

import { useUpdater } from "../Util/util"

// localStorageは保存用
// stateは使用用
const Response = ({ loggedIn, postId, isOpened, postStar, postEmoji, ...props }) => {

    const [emojiId, setEmojiId] = useState()
    const [showStar, handleStarClick] = useUpdater(loggedIn, postStar, "post", postId, "INDII_POST_STAR", props.setPostStar)
    const [chosenEmoji, handleEmojiClick] = useUpdater(loggedIn, postEmoji, "post", postId, "INDII_POST_EMOJI", 
        (set) => {
            props.setPostEmoji(set)
            setEmoji(false)
        },
        [
        (found, set) => {
            const { index } = found
            set[index].timeStamp = Date.now()
            set[index].rate = emojiId
            return set
        },
        (set) => {
            set.push({timeStamp: Date.now(), post: postId, rate: emojiId})
            return set
        }],
        (found) => {
            return found && found.data && found.data.rate
        }
    )

    const [showMore, setMore] = useState(false)
    const [showEmoji, setEmoji] = useState(false)
    const emojiRef = useRef()
    const moreRef = useRef()

    useEffect(() => {
        emojiId && handleEmojiClick()
    }, [emojiId])

    useEffect(() => {
        if(!isOpened){
            setMore(false)
            setEmoji(false)
        }
    }, [isOpened])

    useEffect(() => {
        if (loggedIn){
            if (showEmoji || showMore) {
                document.addEventListener("mousedown", outsideClick)
            } else {
                document.removeEventListener("mousedown", outsideClick)
            }

            return () => {
                document.removeEventListener("mousedown", outsideClick)
            }
        }
    }, [loggedIn, showEmoji, showMore])

    const outsideClick = (e) => {
        if(emojiRef.current.contains(e.target)) {
            return null;
        }

        if(moreRef.current.contains(e.target)) {
            return null;
        }

        setEmoji(false)
        setMore(false)
    }

    const handleResponseClick = (e) => {
        e.preventDefault()
        setMore(false)
        setEmoji(!showEmoji)
    }

    const handleMoreClick = (e) => {
        e.preventDefault()
        setEmoji(false)
        setMore(!showMore)
    }

    const handleNoAuthClick = (e) => {
        e.preventDefault()
        props.showLogin()
    }

    const deletePost = () => {
        setMore(false)

        const id = postId;
        const action = "POST_DELETE"
        const title = "ポストを削除";
        const caution = ""
        const message = "このポストを削除してもよろしいですか？";
        const buttonMessage = "削除する";
        props.showConfirmation(id, action, title, caution, message, buttonMessage)
        props.enableGray()
    }

    const reportPost = () => {
        setMore(false)

        const id = postId;
        const action = "GIVE_FEEDBACK";
        const title = "このポストへのフィードバック";
        const message = "このポストについてどう思いましたか？";
        const caution = "（このフィードバックは匿名で保存されます。）";
        const buttonMessage = "送信する";
        props.showConfirmation(id, action, title, caution, message, buttonMessage);
        props.enableGray();
    };

    return (
        <div>
            <Star
                show={showStar}
                handleClick={loggedIn ? handleStarClick : handleNoAuthClick}
                shadow={true}
            />
            <Emoji
                ref={emojiRef}
                handleResponseClick={loggedIn ? handleResponseClick : handleNoAuthClick}
                handleEmojiClick={(e, id) => { e.preventDefault(); setEmojiId(id) }}
                chosenEmoji={chosenEmoji}
                showEmoji={showEmoji}
                shadow={true}
            />
            <ShowMore
                ref={moreRef}
                handleClick={loggedIn ? handleMoreClick : handleNoAuthClick}
                show={showMore}
                left="-110px"
                bottom="23px"
                // actionName={["フィードバックをする", "この投稿を削除する"]}
                actionName={["フィードバックをする"]}
                // action={[reportPost, deletePost]}
                action={[reportPost]}
                shadow={true}
            />
        </div>
    )
}

Response.propTypes = {
    postId: PropTypes.string,
    isOpened: PropTypes.bool,
}

function mapStateToProps({ auth, post }) {
    return {
        loggedIn: auth.loggedIn,
        postStar: post.postStar,
        postEmoji: post.postEmoji
    }
}

export default connect(mapStateToProps, actions)(Response)