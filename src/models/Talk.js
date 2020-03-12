import mongoose from "mongoose"

const { Schema } = mongoose

const talkSchema = new Schema({
    timeStamp: Date,
    title: String,
    description: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    refType: {type: String, enum: ["POST", "TOPIC"]},
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    pinned: { type: Boolean, default: false}, // 優先して一番上に載っけるもの
    comments: [{
        content: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timeStamp: Date,
    }],
    msgCounter: {type: Number, default: 0},
})

const Talk = mongoose.model("Talk", talkSchema)

export default Talk