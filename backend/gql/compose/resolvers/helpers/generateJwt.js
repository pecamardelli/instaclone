const jwt = require("jsonwebtoken");
const { jwt: jwtCfg } = require("../../../../config/config");

const generateJwt = (payload) => {
  return {
    token: jwt.sign(payload, jwtCfg.privateKey, {
      expiresIn: jwtCfg.lifeTime,
    }),
  };
};

module.exports = generateJwt;
