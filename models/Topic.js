import mongoose from "mongoose"

const { Schema } = mongoose

const topicSchema = new Schema({
    column: [{
        _id: Number,
        index: Number, // Column別にrenderする時に役に立つ
        title: String,
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    }],
    topicName: String,
    img: String,
    tags: [String],
    order: [Number],
    likes: {type: Number, default: 0},
    postCount: {type: Number, default: 0},
})

const Topic = mongoose.model("Topic", topicSchema)

export default Topic