const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(input) {
    const userData = input;
    userData.username = userData.username.toLowerCase();
    userData.email = userData.email.toLowerCase();

    // Destructure properties
    const { username, email, password } = userData;

    // Check availability
    if (await User.findOne({ username }))
        throw new Error("Username not available.");

    if (await User.findOne({ email }))
        throw new Error("Email not available.");

    // Encrypt the password
    const salt = bcryptjs.genSaltSync(10);
    userData.password = bcryptjs.hashSync(password, salt);

    try {
        const newUser = new User(userData);
        newUser.save();
        return newUser;
    } catch (error) {
        console.log(`User could not be created: ${error.message}`);
    }
}

async function loginUser(input) {
    if (!input.password || !input.email) throw new Error("Missing login data.");

    const user = await User.findOne({ email: input.email.toLowerCase() });
    if (!user) throw new Error("Invalid login");

    const passwd = await bcryptjs.compare(input.password, user.password);
    if (!passwd) throw new Error("Invalid login");
    
    const { id, name, username, email } = user;
    const payload = { id, name, username, email };
    
    return {
        token: jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: "24h" })
    };
}

module.exports = {
    registerUser,
    loginUser,
};