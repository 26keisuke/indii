import mongoose from "mongoose"

const { Schema } = mongoose

const draftSchema = new Schema({
    topic: { type: mongoose.Schema.Types.ObjectId, ref:"Topic" },
    topicName: String, // for fast lookup
    topicRectangleImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, // for fast lookup
    topicSquareImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"},
    topicMobileImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    postName: String,
    postImg: { type: mongoose.Schema.Types.ObjectId, ref: "Image"}, 
    creationDate: Date,
    editDate: [Date],
    date: Date, // delete this after
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: String,
    config: {
        allowEdit: Boolean
    },
    type: String,
    isValid: {type: Boolean, default: true}, // 同じタイトルのコンテンツが他のユーザーによって投稿された場合
    isDeleted: {type: Boolean, default: false},
    isUploaded: {type: Boolean, default: false},
    ref: [{
        refType: String,
        title: String,
        url: String,
        author: String,
        postDate: String,
        website: String,
        source: String,
        date: String,
        publishDate: String,
        publisher: String,
        isbnurl: String,
        page: String,
        doi: String,
        bookTitle: String,
        chapterTitle: String,
        editor: String,
        heldDate: String,
        conferenceName: String,
        creator: String,
        creatorUrl: String, 
        sourceUrl: String,
        licenseName: String,
        licenseUrl: String,
        licenseHolder: String,
        licenseDate: String,
        isDeleted: {type: Boolean, default: false},
    }]
})

const Draft = mongoose.model("Draft", draftSchema)

export default Draft