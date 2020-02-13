import mongoose from "mongoose"

const { Schema } = mongoose

const draftSchema = new Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId, ref:"Topic"
    },
    topicName: String, // for fast lookup
    topicImg: String, // for fast lookup
    postName: String,
    date: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: String,
    config: {
        allowEdit: Boolean
    },
    type: String,
    isValid: {type: Boolean, default: true},
})

const Draft = mongoose.model("Draft", draftSchema)

export default Draft