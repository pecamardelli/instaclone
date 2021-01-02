const User = require("../models/user");
const bcryptjs = require("bcryptjs");

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

module.exports = {
    registerUser,
};