import express, { Request, Response } from "express"
import { authenticateJwt, SECRET, jwt } from "../middleware/auth"
import { User, Course, Admin } from "../db"
import Razorpay from "razorpay";
import * as crypto from "crypto";


import "dotenv/config"

const router = express.Router();



if (process.env.key_id && process.env.key_secret) {
  var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
} else {
  console.log('Cant find secrets of Razorpay')
}



router.post('/signup', async (req: Request, res: Request) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

router.post('/login', async (req: Request, res: Request) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.get('/courses', authenticateJwt, async (req: Request, res: Request) => {
  const coursesToSkip = Number(req.query.skip);
  const pageno = Number(req.query.pageno);
  const perpage = 4;
  const courseslength = (await Course.find({ published: true })).length;
  const totalpages = Math.ceil(courseslength / perpage);
  const courses = await Course.find({ published: true }).limit(perpage).skip(coursesToSkip);
  res.json({ pageno, perpage, courseslength, totalpages, courses });
});

router.get('/courses/:filter', async (req: Request, res: Request) => {
  const courseList = await Course.find({ description: { $regex: '.*' + req.params.filter + '.*' } })
  if (courseList.length > 0) {
    res.status(200).json({ courseList })
  } else {

    res.status(401).json({ message: 'course not found' })
  }

})

router.post('/courses/:courseId', authenticateJwt, async (req: Request, res: Request) => {
  const course = await Course.findById(req.params.courseId);
  // console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully', purchasedcourse: course._id });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.post("/razorpay/:courseId", authenticateJwt, async (req: Request, res: Request) => {
  const course = await Course.findById(req.params.courseId);
  var options = {
    amount: course.price, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);
    res.json({
      orderID: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/verification", (req: Request, res: Request) => {
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
  } else {
    res.status(403).json({ message: "Invalid" });
  }
});

router.get('/purchasedCourses', authenticateJwt, async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

export default router