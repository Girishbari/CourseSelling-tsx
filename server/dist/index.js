"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/admin", admin_1.default);
app.use("/user", user_1.default);
app.get("/", (req, res, Response) => {
    res.status(200).json({
        message: 'working'
    });
});
if (process.env.DB) {
    mongoose_1.default.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });
}
else {
    console.log("can not to Database");
}
app.listen(3001, () => console.log('Server running on port 3000'));
