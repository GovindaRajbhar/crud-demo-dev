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

const CategorySchema = new mongoose.Schema<any>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  options
);
CategorySchema.plugin(mongooseLeanId);
const Category = mongoose.model("category", CategorySchema);
export default Category;
