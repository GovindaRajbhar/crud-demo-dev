import mongoose from "mongoose";

const mongooseLeanId = require("mongoose-lean-id");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
    select: false,
  },
  toJSON: {
    virtuals: true,
  },
  toObject: { virtuals: true },
};


// Create Product Schema
const ProductSchema = new mongoose.Schema<any>(
    {
        title: { type: String, unique: true, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        category: { type: String }, 
        //brand: { type: String },
        imageUrl: { type: String }
  }, 
  options
  );


  ProductSchema.plugin(mongooseLeanId);
const Category = mongoose.model("product", ProductSchema);
//Category.collection.drop(); 
export default Category;