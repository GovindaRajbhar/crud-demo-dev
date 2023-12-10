"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlerFactory_1 = __importDefault(require("./handlerFactory"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const CategoryController = {
    create: handlerFactory_1.default.createOne(categoryModel_1.default),
    update: handlerFactory_1.default.updateOne(categoryModel_1.default),
    getAll: handlerFactory_1.default.getAll(categoryModel_1.default),
};
exports.default = CategoryController;
