"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const historyRoutes_1 = __importDefault(require("./routes/historyRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // Allow cookies and credentials if needed
}));
app.use(express_1.default.json());
// Database Connection
mongoose_1.default
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// API Routes
app.use('/api/auth', authRouter_1.default);
app.use("/api/alert", alertRoutes_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api/history", historyRoutes_1.default);
// Routes
app.use("/api/images", imageRoutes_1.default);
// Health Check Route
app.get('/', (req, res) => {
    res.send('Hackathon Platform API is running...');
});
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
