import { Router } from "express";
import { create_notification, get_notification,update_notification_status, userVisitorsCount } from "../controllers/dashboardController.js";


const router = Router();

router.post("/visitors-count", userVisitorsCount);
router.post("/notification/create", create_notification);
router.get("/notification/get", get_notification);
router.patch("/notification/update/:id", update_notification_status);


export default router;
