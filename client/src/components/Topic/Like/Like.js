import React, { useMemo } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../../actions"

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const Like = ({ loggedIn, topicLike, topicId, ...props }) => {
    const find = () => {
        var res;

        topicLike.map((obj,index) => {
            if(obj.topic === topicId){
                res = {
                    data: obj,
                    index: index,
                }
            }
        })

        if(!!res) return res

        return ""
    }

    const handleLikeClick = (e) => {
        e.preventDefault()

        var set = topicLike.slice()

        const found = find()
        if(!!found){
            set.splice(found.index, 1)
        } else {
            set.push({timeStamp: Date.now(), topic: topicId})
        }

        props.setTopicLike(set)
        localStorage.setItem("INDII_TOPIC_LIKE", JSON.stringify(set))
    }

    const isLiked = useMemo(() => loggedIn && !!(find()), [topicLike, topicId])

    return (
        <div>
            { 
            topicId && isLiked
            ? <BookmarkIcon onClick={handleLikeClick}/>
            : <BookmarkBorderIcon onClick={loggedIn ? handleLikeClick : props.showLogin}/>
            }
        </div>
    )
}

Like.propTypes = {
    topicId: PropTypes.string,
}

function mapStateToProps({ auth, topic }){
    return {
        loggedIn: auth.loggedIn,
        topicLike: topic.topicLike
    }
}


export default connect(mapStateToProps, actions)(Like)