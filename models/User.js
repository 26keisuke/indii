import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
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
    active: {type: Boolean, default: false},
    intro: String,
})

const User = mongoose.model("User", userSchema)

export default User