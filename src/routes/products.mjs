import { Router } from "express";
const router = Router();
import ProductController from "../controllers/ProductController.mjs";

router.get("/", ProductController.read);

export default router;