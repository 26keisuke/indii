import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../../actions"

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { useUpdater } from "../../Util/util" 

const Like = ({ loggedIn, topicLike, topicId, ...props }) => {
    const [isLiked, handleLikeClick] = useUpdater(loggedIn, topicLike, "topic", topicId, "INDII_TOPIC_LIKE", props.setTopicLike)

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