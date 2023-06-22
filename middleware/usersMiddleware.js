const Ajv = require("ajv");
const ajv = new Ajv();
require("../server");
const jwt = require("jsonwebtoken");
const { getUserByEmailModel } = require("../src/models/user");
const bcrypt = require("bcrypt");
const { User } = require("../src/models/user");
const { JsonWebTokenError } = require("jsonwebtoken");
const { resolveSchema } = require("ajv/dist/compile");

const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const validateBody = (User) => {
  return (req, res, next) => {
    const valid = ajv.validate(User, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0].message);
      return;
    }
    next();
  };
};
const passwordsMatch = (req, res, next) => {
  console.log("password match");
  if (req.body.password !== req.body.rePassword) {
    res.status(400).send("password don't match");
    return;
  }

  next();
};

async function doesUserExists(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    res.status(400).send("User already exists");
    return;
  }
  next();
}

const hashPassword = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    req.body.password = hash;
    next();
  });
};

const hashedPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("User not found! ");
      return;
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(400).send("Wrong Password!");
      return;
    }
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const userExists = async (req, res, next) => {
  console.log("userExists middleware");
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    res.status(400).send("There is no user under this email");
    return;
  }
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

  jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }
    if (decoded) {
      req.body.id = decoded.id;
      return next();
    }
  });
};

module.exports = {
  doesUserExists,
  validateBody,
  passwordsMatch,
  hashPassword,
  hashedPassword,
  userExists,
  auth,
};
