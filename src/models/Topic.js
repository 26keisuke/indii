import mongoose from "mongoose"

const { Schema } = mongoose

const topicSchema = new Schema({
    topicName: String,
    
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    creationDate: Date,
    
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

    likes: {
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        counter: {type: Number, default: 0},
    },
    postCount: {type: Number, default: 0},
    category: [String],
    
    activity: [{
        type: { type: String, enum: ["EDIT_POST", "CREATE_POST", "EDIT_TOPIC", "CREATE_TOPIC"] },
        postName: String, // for fast lookUp
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timeStamp: Date,
    }],
})

const Topic = mongoose.model("Topic", topicSchema)

export default Topic
