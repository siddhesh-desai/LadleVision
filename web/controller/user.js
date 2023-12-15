// const jwt = require('jsonwebtoken');
import jwt from "js"
const { getUserByEmail, createUser } = require('../db/user'); // Update the path to your user-related functions

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createUserToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge,
    });
};

export const register_post = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists. Registration failed.', data:null });
        }

        // If email doesn't exist, proceed with user creation
        const result = await createUser(email, password, name);
        const token = createUserToken(email);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(201).json({ data: { user: result, token }, success: true, message:"Register Successfully" });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: "Something went wrong",  data:null});
    }
};

export const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials', data:null });
        } else {
            const token = createUserToken(email);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            return res.status(200).json({ data: { user, token }, success: true, message:"Login Succesfully" });
        }
    } catch (err) {
        console.error(err)
        return res.status(400).json({ success: false, message: "Something went wrong", data:null });
    }
};

export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    // res.redirect('/api/user/login');
};
