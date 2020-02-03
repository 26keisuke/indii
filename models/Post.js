import mongoose from "mongoose"

const { Schema } = mongoose

const postSchema = new Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId, ref: "Topic"
    },
    version: [{
        timeStamp: Date,
        index: [Number],
        content: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        state: {
            delete: Boolean,
            warn: Boolean,
        }
    }],
    feedback: [{
        timeStamp: Date,
        feedback: {

        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    rating: [{
        timeStamp: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rate: Number,
    }],
    star: {
        counter: Number,
        action: [{
            timeStamp: Date,
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        }],
    },
    reader: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        startTimeStamp: Date,
        endTimeStamp: Date,
    }],
    config: {
        allowEdit: Boolean
    }
})

const Post = mongoose.model("Post", postSchema)

export default Post