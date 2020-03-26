import React, { useMemo, useRef, useState, useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../actions"

import ShowMore from "./ShowMore"
import Emoji from "./Emoji"
import Star from "./Star"

// localStorageは保存用
// stateは使用用
const Response = ({ info, loggedIn, postId, isOpened, postStar, postEmoji, ...props }) => {

    const [showMore, setMore] = useState(false)
    const [showEmoji, setEmoji] = useState(false)
    const emojiRef = useRef()
    const moreRef = useRef()

    const find = (type) => {
        var res;
        const isStar = type === "STAR"
        const item = isStar ? postStar : postEmoji

        item.map((obj,index) => {
            if(obj.post === postId){
                res = {
                    data: obj,
                    index: index,
                }
            }
        })

        if(!!res) return res

        return ""
    }

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

    const handleStarClick = (e) => {
        e.preventDefault()

        var set = postStar.slice()

        const found = find("STAR")
        if(!!found){
            set.splice(found.index, 1)
        } else {
            set.push({timeStamp: Date.now(), post: postId})
        }

        props.setPostStar(set)
        localStorage.setItem("INDII_POST_STAR", JSON.stringify(set))
    }

    const handleResponseClick = (e) => {
        e.preventDefault()
        setMore(false)
        setEmoji(!showEmoji)
    }

    const handleEmojiClick = (e, id) => {
        e.preventDefault()

        const set = postEmoji.slice()

        const found = find("EMOJI")
        if(!!found){
            const { index } = found
            set[index].timeStamp = Date.now()
            set[index].rate = id
        } else {
            set.push({timeStamp: Date.now(), post: postId, rate: id})
        }

        props.setPostEmoji(set)
        localStorage.setItem("INDII_POST_EMOJI", JSON.stringify(set))
        
        setEmoji(false)
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

    const chosenEmoji = useMemo(() => loggedIn && find("EMOJI").data && find("EMOJI").data.rate, [postEmoji, postId])
    const showStar = useMemo(() => loggedIn && !!(find("STAR")), [postStar, postId])

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
                handleEmojiClick={handleEmojiClick}
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
                actionName={["フィードバックをする", "この投稿を削除する"]}
                action={[reportPost, deletePost]}
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
        info: auth.info,

        postStar: post.postStar,
        postEmoji: post.postEmoji
    }
}

export default connect(mapStateToProps, actions)(Response)