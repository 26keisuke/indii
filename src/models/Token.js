// Reference
// https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb

import mongoose from "mongoose"

const { Schema } = mongoose

const tokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    token: { type: String, required: true },
    timeStamp: { type: Date, required: true, default: Date.now, expires: 43200} //12 hours
})

const Token = mongoose.model("Token", tokenSchema)

export default Token