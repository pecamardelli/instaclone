const bcryptjs = require("bcryptjs");
const { encrypt } = require("../../../config/config");
const { UserLoginInput, UserRegisterInput } = require("./inputs/userInputs");
const { UserLoginPayload } = require("./types/userTypes");
const generateJwt = require("./helpers/generateJwt");
const fileUploadHandler = require("../../../services/fileUploads/fileService");

const addUserCustomResolvers = (UserTC) => {
  /**
   * ### REGISTER USER RESOLVER ###
   */
  UserTC.addResolver({
    name: "userRegister",
    type: UserLoginPayload, // Using the same type from login since this will return a token too.
    args: {
      record: UserRegisterInput,
    },
    resolve: async ({ source, args, context, info }) => {
      const { record } = args;
      console.log(args);
      if (!record.password || !record.email || !record.username || !record.name)
        throw new Error("Required fields missing.");
      const createOne = UserTC.mongooseResolvers.createOne().resolve;

      // Encrypt the password
      const salt = await bcryptjs.genSalt(parseInt(encrypt.saltRounds));
      record.password = await bcryptjs.hash(record.password, salt);

      const createOneArgs = {
        name: record.name,
        username: record.username,
        role: "user",
        email: record.email.toLowerCase(),
        password: record.password,
      };

      const createdUser = await createOne({
        args: { record: { ...createOneArgs } },
      });

      const { id, name, username, email, avatar, role } = createdUser.record;
      const payload = { id, name, username, email, avatar, role };

      return generateJwt(payload);
    },
  });

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

      const { id, name, username, role, email, avatar } = user;
      const payload = { id, name, username, role, email, avatar };

      return generateJwt(payload);
    },
  });

  /**
   * ### UPDATE AVATAR RESOLVER ###
   */
  UserTC.addResolver({
    name: "userUpdateAvatar",
    type: UserTC.mongooseResolvers.updateById().getType(),
    args: {
      _id: "MongoID!",
      file: "Upload!",
    },
    resolve: async ({ source, args, context, info }) => {
      const { file } = args;

      const fileHandlerResult = await fileUploadHandler({
        file,
        callerId: context.user.id,
        uploadType: "avatar",
        isPublic: true,
      });

      const userUpdateById = UserTC.mongooseResolvers.updateById().resolve;
      const result = await userUpdateById({
        args: {
          _id: context.user.id,
          record: {
            avatar: `${fileHandlerResult.fileName}.${fileHandlerResult.fileExtension}`,
          },
        },
      });

      return result;
    },
  });
};

module.exports = addUserCustomResolvers;
