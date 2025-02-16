"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyController_1 = require("../controllers/historyController");
const router = express_1.default.Router();
router.get("/", historyController_1.getHistoryData);
router.get("/:id", historyController_1.getHistoryDetails);
exports.default = router;
