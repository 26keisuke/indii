import mongoose from "mongoose"

const { Schema } = mongoose

const draftSchema = new Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId, ref:"Topic"
    },
    version: [{
        content: String,
    }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const Draft = mongoose.model("Draft", draftSchema)

export default Draft