import mongoose from "mongoose"

const { Schema } = mongoose

const draftSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    // topic: {
    //     type: mongoose.Schema.Types.ObjectId, ref:"Topic"
    // },
    content: String
})

const Draft = mongoose.model("Draft", draftSchema)

export default Draft