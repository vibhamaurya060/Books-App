import { Schema, model } from "mongoose"

const bookSchema=new Schema({
    user_id:{type:Schema.Types.ObjectId, ref:"users"},
    title: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    gen: {type: String}
},{timestamps:true})

const bookModel=model("books", bookSchema);

export default bookModel;

