// // *----------------------
// //* Controllers
// // *----------------------

// const User = require("../models/User");

// //? In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.
// // const bcrypt = require("bcryptjs");

// // *-------------------
// // Home Logic
// // *-------------------
// const home = async (req, res) => {
//   try {
//     res.status(200).json({ msg: "Welcome to our home page" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // *-------------------------------
// //* User Registration Logic 📝
// // *-------------------------------
// // 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// // 2. Check Email Existence: 📋 Check if the email is already registered.
// // 3. Hash Password: 🔒 Securely hash the password.
// // 4. Create User: 📝 Create a new user with hashed password.
// // 5. Save to DB: 💾 Save user data to the database.
// // 6. Respond: ✅ Respond with "Registration Successful" or handle errors.

// const register = async (req, res) => {
//   try {
//     // const data = req.body;
//     // console.log(req.body);
//     const { username, email, phone, password } = req.body;

//     const userExist = await User.findOne({ email: email });

//     if (userExist) {
//       return res.status(400).json({ msg: "email already exists" });
//     }

//     const userCreated = await User.create({ username, email, phone, password });

//     res.status(201).json({ message: "User registered successfully" });
//     res.status(201).json({
//       msg: "Registration Successful",
//       token: await userCreated.generateToken(),
//       userId: userCreated._id.toString(),
//     });
//   } catch (error) {
//     console.error("Registration Error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // *-------------------------------
// //* User Login Logic 📝
// // *-------------------------------

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userExist = await User.findOne({ email });

//     if (!userExist) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // const user = await bcrypt.compare(password, userExist.password);
//     const isPasswordValid = await userExist.comparePassword(password);

//     if (isPasswordValid) {
//       res.status(200).json({
//         message: "Login Successful",
//         // token: await userExist.generateToken(),
//         // userId: userExist._id.toString(),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or passord " });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { home, register, login };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'JobBoard'; // Replace with your secret key

// Register a new user
exports.register = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
