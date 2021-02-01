const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saveImage = require("../utils/saveImage");

const avatarDir = "./public/images/avatars";

async function registerUser(input) {
  const userData = input;
  userData.username = userData.username.toLowerCase();
  userData.email = userData.email.toLowerCase();

  // Destructure properties
  const { username, email, password } = userData;

  // Check availability
  if (await User.findOne({ username }))
    throw new Error("Username not available.");

  if (await User.findOne({ email })) throw new Error("Email not available.");

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

  const { id, name, username, email, avatar } = user;
  const payload = { id, name, username, email, avatar };

  return {
    token: jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: "24h" }),
  };
}

async function getUser(id, username) {
  let user;
  if (id) user = User.findById(id);
  else if (username) user = User.findOne({ username });

  if (!user) throw new Error("User not found...");

  return user;
}

async function updateAvatar(file, ctx) {
  // In order to get this function working, there's a tweak that must be done.
  // Copy the following code to package.json:
  //
  // "resolutions": {
  //  "**/**/fs-capacitor": "^4.0.0",
  //  "**/graphql-upload": "^9.0.0"
  // }
  //
  // Apparently, there are compatibility issues between newest versions of node and fs-capacitor.
  // https://stackoverflow.com/questions/59620803/createreadstream-throwing-rangeerror-maximum-call-stack-size-exceeded-when-up

  return file
    .then((file) => {
      const { user } = ctx;
      const { createReadStream, mimetype } = file;
      const imageType = mimetype.split("/")[1]; // Should be jpeg or png and equal to the extension...
      const imagePath = `${avatarDir}/${user.id}.${imageType}`;
      const imageData = createReadStream();
      saveImage(imageData, imagePath);

      User.findByIdAndUpdate(
        user.id,
        {
          avatar: `${user.id}.${imageType}`,
        },
        (err) => {
          console.log(err);
        }
      );

      return {
        status: true,
        avatarUrl: `${user.id}.${imageType}`,
      };
    })
    .catch((err) => {
      return {
        status: false,
        avatarUrl: "",
      };
    });
}

async function deleteAvatar(ctx) {
  const { id } = ctx.user;

  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    return false;
  }
}

async function updateUser(input, ctx) {
  const { user } = ctx;
  const {
    username,
    email,
    website,
    description,
    currentPassword,
    newPassword,
  } = input;

  try {
    const userFound = await User.findById(user.id);

    if (currentPassword && newPassword) {
      const passwordIsCorrect = await bcryptjs.compare(
        currentPassword,
        userFound.password
      );

      if (!passwordIsCorrect) throw new Error("Wrong password.");

      const salt = await bcryptjs.genSalt();
      const encryptedNewPassword = await bcryptjs.hash(newPassword, salt);

      userFound.password = encryptedNewPassword;
    }

    if (email) {
      const result = await User.findOne({ email });
      if (result) return "Email is already in use.";
      userFound.email = email;
    }

    if (website) userFound.website = website;
    if (description) userFound.description = description;

    userFound.save();
    return userFound;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function search(keyword) {
  try {
    const users = await User.find({
      name: { $regex: keyword, $options: "i" },
    });

    console.dir({ users: users[0] });

    return users;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  search,
};
