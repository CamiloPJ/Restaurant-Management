import foodModel from "../models/foodModels.js";
import fs from 'fs'

//Add food

const addFood = async(req,res) => {
        // Verifica si se subió un archivo
    if (!req.file) {
        return res.json({ success: false, message: "No se subió ninguna imagen" });
    }

    let image_filename = req.file.filename;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success: true, message:"Product Added"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error al anadir el producto"})
    }

}

//All food list
const listFood = async(req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//Remove food
const removeFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

export {addFood, listFood, removeFood}