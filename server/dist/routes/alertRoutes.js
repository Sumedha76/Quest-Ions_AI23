"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alertController_1 = require("../controllers/alertController");
const router = (0, express_1.Router)();
router.post("/send-alert", alertController_1.sendAlert);
exports.default = router;
