"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.Admin = exports.User = void 0;
const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});
const User = mongoose.model('User', userSchema);
exports.User = User;
const Admin = mongoose.model('Admin', adminSchema);
exports.Admin = Admin;
const Course = mongoose.model('Course', courseSchema);
exports.Course = Course;
