import { Router } from "express";
import { userVisitorsCount } from "../controllers/dashboardController.js";


const router = Router();

router.post("/visitors-count", userVisitorsCount);


export default router;
