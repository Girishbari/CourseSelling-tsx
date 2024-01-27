"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const razorpay_1 = __importDefault(require("razorpay"));
const crypto = __importStar(require("crypto"));
require("dotenv/config");
const router = express_1.default.Router();
if (process.env.key_id && process.env.key_secret) {
    var instance = new razorpay_1.default({
        key_id: process.env.key_id,
        key_secret: process.env.key_secret,
    });
}
else {
    console.log('Cant find secrets of Razorpay');
}
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new db_1.User({ username, password });
        yield newUser.save();
        const token = auth_1.jwt.sign({ username, role: 'user' }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = auth_1.jwt.sign({ username, role: 'user' }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
router.get('/courses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coursesToSkip = Number(req.query.skip);
    const pageno = Number(req.query.pageno);
    const perpage = 4;
    const courseslength = (yield db_1.Course.find({ published: true })).length;
    const totalpages = Math.ceil(courseslength / perpage);
    const courses = yield db_1.Course.find({ published: true }).limit(perpage).skip(coursesToSkip);
    res.json({ pageno, perpage, courseslength, totalpages, courses });
}));
router.get('/courses/:filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseList = yield db_1.Course.find({ description: { $regex: '.*' + req.params.filter + '.*' } });
    if (courseList.length > 0) {
        res.status(200).json({ courseList });
    }
    else {
        res.status(401).json({ message: 'course not found' });
    }
}));
router.post('/courses/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findById(req.params.courseId);
    // console.log(course);
    if (course) {
        const user = yield db_1.User.findOne({ username: req.user.username });
        if (user) {
            user.purchasedCourses.push(course);
            yield user.save();
            res.json({ message: 'Course purchased successfully', purchasedcourse: course._id });
        }
        else {
            res.status(403).json({ message: 'User not found' });
        }
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.post("/razorpay/:courseId", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findById(req.params.courseId);
    var options = {
        amount: course.price,
        currency: "INR",
        receipt: "order_rcptid_11",
    };
    try {
        const order = yield instance.orders.create(options);
        res.json({
            orderID: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post("/verification", (req, res) => {
    const secret = "razorpaysecret";
    console.log(req.body);
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    console.log(digest, req.headers["x-razorpay-signature"]);
    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit");
        res.status(200).json({
            message: "OK",
        });
    }
    else {
        res.status(403).json({ message: "Invalid" });
    }
});
router.get('/purchasedCourses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
exports.default = router;
