import { Router } from "express";
import { sendAlert } from "../controllers/alertController";

const router: Router = Router();

router.post("/send-alert", sendAlert);

export default router;
