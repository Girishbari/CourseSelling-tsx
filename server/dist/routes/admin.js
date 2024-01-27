"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const db_1 = require("../db");
const router = express_1.default.Router();
router.get("/me", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield db_1.Admin.findOne({ username: req.user.username });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" });
        return;
    }
    res.json({
        username: admin.username
    });
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const isAdminPresent = yield db_1.Admin.findOne({ username });
    if (isAdminPresent) {
        res.status(403).json({ message: 'admin already present' });
    }
    else {
        const obj = { username: username, password: password };
        const newAdmin = new db_1.Admin(obj);
        newAdmin.save();
        const token = auth_1.jwt.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield db_1.Admin.findOne({ username, password });
    if (admin) {
        const token = auth_1.jwt.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
router.post('/courses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new db_1.Course(req.body);
    yield course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
}));
router.put('/courses/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get('/courses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    res.json({ courses });
}));
router.get('/course/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const course = yield db_1.Course.findById(courseId);
    if (course) {
        res.json({ course });
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
}));
exports.default = router;
