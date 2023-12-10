import factory from "./handlerFactory";
import Product from "../models/productModel";

const ProductController = {
  create: factory.createOne(Product),
  update: factory.updateOne(Product),
  getAll: factory.getAll(Product),
  getById: factory.getOne(Product),
  delete: factory.deleteOne(Product),
};

export default ProductController;
