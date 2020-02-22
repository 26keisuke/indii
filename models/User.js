import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
    isVerified: {type: Boolean, default: false},

    googleId: {type: String, unique: true, sparse: true},
    facebookId: {type: String, unique: true, sparse: true},

    userName: String,
    email: {type: String, unique: true, sparse: true},
    password: String,
    name: {
        familyName: String,
        givenName: String,
    },
    photo: String,
    intro: String,

    followers: [{
        timeStamp: Date,
        user: [{type: mongoose.Schema.Types.ObjectId, ref: "Draft"}],
    }],
    follows: [{
        timeStamp: Date,
        user: [{type: mongoose.Schema.Types.ObjectId, ref: "Draft"}],
    }],

    draft: [{type: mongoose.Schema.Types.ObjectId, ref: "Draft"}],
    post: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],

    likedPost: [{
        timeStamp: Date,
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    }],
    postRating: [{ // emoji
        timeStamp: Date,
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        rate: Number,
    }],
    likedTopic: [{
        timeStamp: Date,
        topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    }],

    activity: [{
        //将来的にはlogin履歴などを全部ここにいれる
        type: String,
        timeStamp: Date,
    }]
})

const User = mongoose.model("User", userSchema)

export default User