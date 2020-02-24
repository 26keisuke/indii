import mongoose from "mongoose"

const { Schema } = mongoose

const postSchema = new Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId, ref: "Topic"
    },
    topicName: String, // for fast lookup
    topicRectangleImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    topicSquareImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    topicMobileImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"},  // おそらくこいつはいらないと思うが一応
    index: [Number], // 2.1の場合は[2,1]
    postName: String,
    postImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    content: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    creationDate: Date,
    lastEdited: Date,
    contribution: [{ // 今のところはただ単にeditされたらここにappendする感じ
        timeStamp: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    state: {
        delete: Boolean,
        warn: Boolean,
    },
    feedback: [{ // report 
        timeStamp: Date,
        feedback: {
            // ここを付け加える
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    rating: [{ // emoji
        timeStamp: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rate: Number,
    }],
    star: {
        counter: {type: Number, default: 0},
        // lookUp: [{
        //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        // }],
        action: [{ // userは全てuniqueじゃなきゃいけない
            timeStamp: Date,
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            // like: Boolean,
        }],
    },
    reader: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        startTimeStamp: Date,
        endTimeStamp: Date,
    }],
    config: {
        allowEdit: {type: Boolean, default: true}
    },
    ref: [{
        refType: String,
        title: String,
        url: String,
        author: String,
        postDate: Date,
        website: String,
        source: String,
        date: Date,
        publishDate: Date,
        publisher: String,
        isbnurl: String,
        page: Number,
        doi: String,
        bookTitle: String,
        chapterTitle: String,
        editor: String,
        heldDate: Date,
        conferenceName: String,
        creator: String,
        creatorUrl: String, 
        sourceUrl: String,
        licenseName: String,
        licenseUrl: String,
        licenseHolder: String,
        licenseDate: Date,
    }]
})

const Post = mongoose.model("Post", postSchema)

export default Post