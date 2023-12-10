"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, options);
CategorySchema.plugin(mongooseLeanId);
const Category = mongoose_1.default.model("category", CategorySchema);
exports.default = Category;
