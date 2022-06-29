/**
 * usersService.js, responsible for managing users buisness logic.
 * Dima Kanawati, 2022
 */


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/usersRepository');
const lodash = require('lodash');

const registerUser = async function (req, res, next) {
    //Get the data.
    const { name, email, password, role, gender } = req.body;
    //Create the user's information.
    const userInfo = {
        name, email, password, role, gender
    }

    try {
        //Insert into the database.
        const user = await userRepo.addUser(userInfo);
        res.status(200).send(user);
    }
    catch (err) {
        res.status(400).send(err);
    }
}



const hashPasswordMW = async function (req, res, next) {
    //Get the password.
    const { password } = req.body;

    //If there's no password, send an error. 
    if (!password) {
        return res.status(400).send({ "error": "Missing password" })
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    //Modify the body.
    req.body.password = hashedPassword;

    return next();
}
const login = async function (req, res, next) {
    //Get the email from body. 
    const { email, password } = req.body;
    //If email or the password not given, return an error.
    if (!email || !password) {
        return res.status(400).send({ "error": "Email/passowrd is not given" });
    }
    //Find the user by email.
    const user = await userRepo.findUserByEmail(email);

    //If the user is not found, return an error.
    if (!user) {
        return res.status(404).send({ "error": "User not found" });
    }

    //If the user found. 
    try {
        const isMatch = await bcrypt.compare(password, user.password);
        //If there is no match.
        if (!isMatch) {
            return res.status(400).send({ "error": "Invalid password" });
        }
        //The password mathes.
        const response = signInUser(user);
        return res.status(200).send(response);
    }
    catch (err) {
        return res.status(400).send(err);
    }

}

function signInUser(user) {
    const { id, email, role, name } = user;
    const token = jwt.sign({ id, email, role, name }, process.env.SECRET, { expiresIn: "7 days" });
    return { token, user: { id, email, role, name } };

}

const isAuthenticated = async function (req, res, next) {
    //Look for the token. 
    const token = req.headers.token;
    //If the token not found, return an authenticated error.
    if (!token) {
        return res.status(403).send({ "error": "Token is missing" });
    }
    //If the token is found, verify the token.
    try {
        const decodedUser = await jwt.verify(token, process.env.SECRET);

        //Inject the decoded user into the request object.
        req.user = decodedUser;
        return next();
    }
    catch (err) {
        return res.status(403).send({ "error": "Invalid token" });
    }
}

const isInRole = function (roles) {
    return async function (req, res, next) {
        const { role } = req.user;
        //If the userRole is one of the allowed roles, continue.
        if (lodash.indexOf(roles, role) >= 0) {
            return next();
        }
        //Otherwise, dont continue, and send an authorization error.
        return res.status(401).send({ error: "user's role should be one of: " + roles.join(",") });
    }
}

module.exports = {
    hashPasswordMW,
    registerUser,
    login,
    isAuthenticated,
    isInRole
}