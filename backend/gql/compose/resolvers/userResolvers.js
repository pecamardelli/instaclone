const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { fileUploads, jwt: jwtCfg } = require("../../../config/config");
const { UserLoginInput } = require("./inputs/userInputs");
const { UserLoginPayload } = require("./types/userTypes");
const isValidUUIDV4 = require("is-valid-uuid-v4").isValidUUIDV4;
const { v4: uuidv4 } = require("uuid");

const { publicDir, baseDir, userDir, userAvatarDir } = fileUploads.directories;

const addUserCustomResolvers = (UserTC) => {
  /**
   * ### LOGIN RESOLVER ###
   */
  UserTC.addResolver({
    name: "userLogin",
    type: UserLoginPayload,
    args: {
      record: UserLoginInput,
    },
    resolve: async ({ source, args, context, info }) => {
      const { record } = args;
      const findOne = UserTC.mongooseResolvers.findOne().resolve;
      if (!record.password || !record.email)
        throw new Error("Missing login data.");

      const findOneArgs = { filter: { email: record.email.toLowerCase() } };
      const user = await findOne({
        args: findOneArgs,
      });
      if (!user) throw new Error("Invalid login");

      const passwd = await bcryptjs.compare(record.password, user.password);
      if (!passwd) throw new Error("Invalid login");

      const { id, name, username, email, avatar } = user;
      const payload = { id, name, username, email, avatar };

      return {
        token: jwt.sign(payload, jwtCfg.privateKey, {
          expiresIn: jwtCfg.lifeTime,
        }),
      };
    },
  });

  /**
   * ### UPDATE AVATAR RESOLVER ###
   */
  UserTC.addResolver({
    name: "userUpdateAvatar",
    type: UserTC.mongooseResolvers.updateById().getType(),
    args: {
      file: "Upload!",
    },
    resolve: async ({ source, args, context, info }) => {
      const { file } = args;
      const { createReadStream, mimetype } = await file;
      const splittedMimeType = mimetype.split("/"); // Should be jpeg or png and equal to the extension...
      const extension =
        splittedMimeType.length > 1 ? splittedMimeType[1] : ".none";
      const fileDir = `${publicDir}${baseDir}${userDir}${userAvatarDir}`;

      const splittedAvatarName = context.avatar.split(".");
      const currentAvatarName =
        splittedAvatarName.length > 0 ? splittedAvatarName[0] : null;
      const fileName = currentAvatarName
        ? isValidUUIDV4(currentAvatarName)
          ? currentAvatarName
          : uuidv4()
        : uuidv4();
      const filePath = `${fileDir}/${fileName}.${extension}`;
      const fileData = createReadStream();

      saveImage(fileData, filePath);

      const userUpdateById = UserTC.mongooseResolvers.updateById().resolve;
      const result = await userUpdateById({
        _id: context.id,
        record: { avatar: fileName },
      });

      return result;
    },
  });
};

module.exports = addUserCustomResolvers;
