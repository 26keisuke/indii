import mongoose from "mongoose"

const { Schema } = mongoose

const topicSchema = new Schema({
    column: [{
        index: Number, // Column Index: Column別にrenderする時に役に立つ
        title: String,
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    }],
    topicName: String,
    squareImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    rectangleImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    mobileImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    tags: [String],
    order: [mongoose.ObjectId], // Column Order (by Id in "column")
    likes: {type: Number, default: 0},
    postCount: {type: Number, default: 0},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
})

const Topic = mongoose.model("Topic", topicSchema)

export default Topic