import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
    role: {type: String, default: "User"}, // indii_adminのためのfield
    adminPassword: String, // indii_adminのためのfield

    isVerified: {type: Boolean, default: false},
    verifiedDate: Date,

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
    comment: String,
    intro: String,

    followers: [{
        timeStamp: Date,
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }],
    follows: [{
        timeStamp: Date,
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }],

    draft: [{type: mongoose.Schema.Types.ObjectId, ref: "Draft"}],
    post: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],

    // こっから下はactivity関連。全てactivityにぶっこんでもいいが、将来的には、
    // それぞれに入れるべき要素が増えていくだろうから、分けた方がいい

    editPost: [{
        timeStamp: Date,
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    }],
    editTopic: [{
        timeStamp: Date,
        topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    }],
    createTopic: [{
        timeStamp: Date,
        topic:  { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    }],

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
    createTalk: [{
        timeStamp: Date,
        talk: { type: mongoose.Schema.Types.ObjectId, ref: "Talk" },
    }],
    createComment: [{
        timeStamp: Date,
        talk: { type: mongoose.Schema.Types.ObjectId, ref: "Talk" },
        content: String,
    }],

    notif: [{
        timeStamp: Date,
        type: {type: String, enum: ["POST_EMOJI", "POST_LIKE", "FOLLOWED", "POST_EDIT", "POST_EDIT_OK", "POST_EDIT_FEEDBACK"]},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        checked: {type: Boolean, default: false},

        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // これはPOSTの場合に必要
        emoji: String, // これはPOST&POST_EDIT_FEEDBACKの場合に必要
        draft: { type: mongoose.Schema.Types.ObjectId, ref: "Draft" }, // これはallowEditがfalseの場合に必要
        comment: String, // これはPOST_EDIT_FEEDBACKの時のみ必要
        isApproved: Boolean, // これはPOST_EDIT_FEEDBACKの時のみ必要
    }],

    activity: [{
        timeStamp: Date,
        type: { type: String,　enum: [ "LOG_IN", "LOG_OUT"] },
    }],


})

const User = mongoose.model("User", userSchema)

export default User