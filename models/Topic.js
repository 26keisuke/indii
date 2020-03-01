import mongoose from "mongoose"

const { Schema } = mongoose

const topicSchema = new Schema({
    topicName: String,
    
    squareImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    rectangleImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    mobileImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 

    tags: [String],

    column: [{
        index: Number, // Column Index: Column別にrenderする時に役に立つ
        title: String,
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}], // ordered
    }],
    order: [mongoose.ObjectId], // Column Order (by Id in "column")
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}], // これに関しては、Indexの順番じゃなくていい

    likes: {type: Number, default: 0},
    postCount: {type: Number, default: 0},
    
    activity: [{
        type: { type: String, enum: ["EDIT_POST", "CREATE_POST", "EDIT_TOPIC", "CREATE_TOPIC"] },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timeStamp: Date,
    }],
})

const Topic = mongoose.model("Topic", topicSchema)

export default Topic
