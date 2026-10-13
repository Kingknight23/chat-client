import {
    registerUser,
    loginUser
} from "../services/auth.service.js";

const register = async (
    req,
    res,
    next
) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const result =
            await registerUser(
                username,
                email,
                password
            );

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    // JWT is stateless. The frontend clears its stored token, and the server
    // rejects the token once its one-hour expiry has passed.
    res.status(200).json({ message: "Logged out successfully" });
};

const login = async (
    req,
    res,
    next
) => {
    try {
        const {
            email,
            password
        } = req.body;

        const result =
            await loginUser(
                email,
                password
            );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export {
    register,
    login,
    logout
};