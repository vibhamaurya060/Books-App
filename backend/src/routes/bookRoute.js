import { Router } from "express";
import bookModel from "../models/bookModel.js";
import role from "../middlewares/role.js";

const bookRouter=Router();

// get books
bookRouter.get('/', role(["user","admin"]),async(req, res)=>{
    const books=await bookModel.find();
    res.json({books: books});
    try{

    }catch(err){
        res.status(500).send(err);
    }
})


// post books
bookRouter.post('/',role(["admin"]), async(req, res)=>{
    const {title, author, price, gen}= req.body;
    try{
        const books=new bookModel({title, author, price, gen,user_id: req.result.id})
        await books.save();

        res.status(201).json({message: "book is created successfully"})

    }catch(err){
        res.status(500).send(err);
    }
})


// update books
bookRouter.patch('/:id',role(["admin"]), async(req, res)=>{
      const {id}=req.params;
      const {title, author, price, gen}=req.body;
    try{
        const book=await bookModel.findById(id);
        if(!book){
            return res.status(404).json({message:"book not found"});
        }
        book.title=title;
        book.author=author;
        book.price=price;
        book.gen=gen;
        await book.save();
        res.json({message: "book updated successfully"});

    }catch(err){
        res.status(500).send(err);
    }
})

// delete book

bookRouter.delete('/:id',role(["admin"]), async(req, res)=>{
    const {id}=req.params;
    try{
         const book=await bookModel.findById(id);
         if(!book){
            return res.status(404).json({message: "book not found"});
         }
         await bookModel.findByIdAndDelete(id);
         res.json({message: "book deleted successfully"});
    }
    catch(err){
        res.status(500).send(err);
    }
})


export default bookRouter;