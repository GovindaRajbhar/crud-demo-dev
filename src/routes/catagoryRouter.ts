import express from "express";
import CategoryController from "../controllers/categoryController";
const router: any = express.Router();

// user routes
/** @used */
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
