const { v4: uuidv4 } = require("uuid");
const { fileUploads } = require("../../../config/config");
const { TC: UserTC } = require("../UserTC");
const saveFile = require("../../../utils/saveFile");
const {
  PublicationManyByUsernameInput,
} = require("./inputs/publicationInputs");
const fileUploadHandler = require("../../../services/fileUploads/fileService");

const addPublicationCustomResolvers = (PublicationTC) => {
  // This extends the input type for Publication in order to accept an Upload type on args.
  PublicationTC.addResolver({
    name: "_publicationCreateOne",
    type: PublicationTC.mongooseResolvers.createOne().getType(),
    args: {
      file: "Upload!",
      record: PublicationTC.mongooseResolvers.createOne().getArgs().record,
    },
    resolve: async ({ source, args, context, info }) => {
      const PublicationCreateOne = PublicationTC.mongooseResolvers.createOne()
        .resolve;
      const { publicDir, baseDir, publicationsDir } = fileUploads.directories;
      const { record, file } = args;

      // const { createReadStream, mimetype } = await file;
      // const splittedMime = typeof mimetype === "string" && mimetype.split("/"); // Should be jpeg or png and equal to the extension...
      // const fileExtension = `${
      //   Array.isArray(splittedMime) && splittedMime.length > 1
      //     ? splittedMime[1]
      //     : ".none"
      // }`;
      // const fileDir = `${publicDir}${baseDir}${publicationsDir}`;
      // const fileName = `${uuidv4()}`;
      // const filePath = `${fileDir}/${fileName}.${fileExtension}`;
      // const fileData = createReadStream();

      // await saveFile(fileData, filePath);

      const fileHandlerResult = await fileUploadHandler({
        file,
        callerId: context.user.id,
        uploadType: "publication",
        isPublic: true,
      });

      record.fileName = `${fileHandlerResult.fileName}`;
      record.fileExtension = `${fileHandlerResult.fileExtension}`;

      return PublicationCreateOne({ source, args, context, info });
    },
  });

  PublicationTC.addResolver({
    name: "publicationManyByUsername",
    type: PublicationTC.mongooseResolvers.findMany().getType(),
    args: {
      filter: PublicationManyByUsernameInput,
    },
    resolve: async ({ source, args, context, info }) => {
      const { username } = args.filter;
      const user = await UserTC.mongooseResolvers
        .findOne()
        .resolve({ args: { filter: { username } } });

      if (!user) throw new Error("Invalid username provided.");

      const publications = await PublicationTC.mongooseResolvers
        .findMany()
        .resolve({ args: { filter: { userId: user._id } } });

      return publications;
    },
  });
};

module.exports = addPublicationCustomResolvers;
