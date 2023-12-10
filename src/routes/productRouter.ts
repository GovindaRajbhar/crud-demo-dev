import express from "express";
import ProdcutController from "../controllers/productController";
const router: any = express.Router();

// user routes

/** @used */
router.get("/", ProdcutController.getAll);
router.get("/:id", ProdcutController.getById);
router.post("/", ProdcutController.create);
router.put("/:id", ProdcutController.update);
router.delete("/:id", ProdcutController.delete);

export default router;
