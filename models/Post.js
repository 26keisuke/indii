import mongoose from "mongoose"

const { Schema } = mongoose

const postSchema = new Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId, ref: "Topic"
    },
    index: [Number], // 2.1の場合は[2,1]
    content: String,
    contribution: [{
        timeStamp: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    state: {
        delete: Boolean,
        warn: Boolean,
    },
    feedback: [{
        timeStamp: Date,
        feedback: {
            // ここを付け加える
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    rating: [{
        timeStamp: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rate: Number,
    }],
    star: {
        counter: {type: Number, default: 0},
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