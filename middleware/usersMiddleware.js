const Ajv = require("ajv");
const ajv = new Ajv();
const jwt = require("jsonwebtoken");
const { getUserByEmailModel } = require("../src/models/user");
const bcrypt = require("bcrypt");
const { User } = require("../src/models/user");

// const validateBody = (userSchema) => {
//   return (req, res, next) => {
//     const valid = ajv.validate(userSchema, req.body);
//     if (!valid) {
//       res.status(400).send(ajv.errors[0].message);
//       return;
//     }
//     next();
//   };
// };

const passwordsMatch = (req, res, next) => {
  const { password, rePassword } = req.body;
  if (password !== rePassword) {
    const err = new Error("Passwords don't match");
    err.statusCode = 400;
    next(err);
    return;
  }

  next();
};

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    next(err);
    return;
  }
  next();
};

// const hashPwd = async (req, res, next) => {
//   try {
//     const hash = await bcrypt.hash(req.body.password, 10);
//     req.body.password = hash;
//     next();
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

const doesUserExist = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    res.status(400).send("User with this email does not exist");
    return;
  }
  req.body.user = user;
  next();
};

const auth = (req, res, next) => {
  if (req.path === "/loggedout") {
    return next();
  }
  if (!req.cookies.token) {
    res.status(401).send("Must have access token");
    return;
  }

  jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
      return;
    }

    if (decoded) {
      req.body.userId = decoded.id;
      next();
      return;
    }
  });
};

module.exports = {
  passwordsMatch,
  isNewUser,
  // hashPwd,
  doesUserExist,
  auth,
};
