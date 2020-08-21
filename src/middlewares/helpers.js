import joi from 'joi';
import bcrypt from 'bcryptjs';
import model from '../db';

const { User } = model;

const Helper = {
  // generate hashed password for user
  hashPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  // check password validation
  comparePassword: (password, hashPassword) =>
    bcrypt.compareSync(password, hashPassword),
  // check for existing email
  existEmail: (email) =>
    User.findOne({
      where: {
        email,
      },
    }),
  // check for existing id
  existUserById: (id) =>
    User.findOne({
      where: {
        id,
      },
    }),
  /** Validate user schems */
  validateBody: (schema) => (req, res, next) => {
    const result = joi.validate(req.body, schema);

    if (result.error) {
      return res.status(400).json({
        message: result.error,
      });
    }

    // check if req.value
    if (!req.value) req.value = {};
    req.value.body = result.value;
    next();
  },
  schemas: {
    authSchema: joi.object().keys({
      fname: joi.string().required(),
      lname: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
    signSchema: joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
};

export default Helper;
