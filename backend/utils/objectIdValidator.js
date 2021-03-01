const ObjectId = require("mongoose").Types.ObjectId;

// Very handy function : https://stackoverflow.com/questions/13850819/can-i-determine-if-a-string-is-a-mongodb-objectid
const objectIdValidator = (id) => {
  return ObjectId.isValid(id)
    ? String(new ObjectId(id)) === id
      ? true
      : false
    : false;
};

module.exports = objectIdValidator;
