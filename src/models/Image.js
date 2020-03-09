import mongoose from "mongoose"

const { Schema } = mongoose

const imageSchema = new Schema({
    image: String,
})

const Image = mongoose.model("Image", imageSchema)

export default Image