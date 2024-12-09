"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mcqController_1 = require("../controllers/mcqController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, mcqController_1.getMCQs);
router.post('/submit', authMiddleware_1.default, mcqController_1.submitMCQAnswers);
router.post('/', mcqController_1.addMCQ);
exports.default = router;
