import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
    googleId: {type: String, unique: true},
    name: {
        familyName: String,
        givenName: String,
    },
    photo: String,
})

const User = mongoose.model("User", userSchema)

export default User