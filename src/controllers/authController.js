import model from '../db';
import Token from '../middlewares/token';
import Helper from '../middlewares/helpers';
import sendEmail from '../middlewares/mailTemplate';
import { v4 as uuidv4 } from 'uuid';

const { User } = model;
const baseUrl = process.env.BASE_URL;

class AuthController {
  static async signUp(req, res) {
    try {
      let { fname, lname, email, password } = req.value.body;
      email = email.toLowerCase().trim();
      const existingUser = await Helper.existEmail(email);
      if (existingUser) {
        return res.status(401).json({
          status: 'error',
          message: 'User already exist',
        });
      }

      const hashPassword = await Helper.hashPassword(password);
      const newUser = await User.create({
        id: uuidv4(),
        fname,
        lname,
        email,
        password: hashPassword,
      });

      res.status(201).json({
        status: 'success',
        data: newUser,
        token: `Bearer ${token}`,
        message: 'Registered successfully',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async signIn(req, res) {
    try {
      const user = req.user;
      const token = await Token.generateToken(user);
      res.status(201).json({
        status: 'success',
        data: user,
        token: `Bearer ${token}`,
        message: 'Logged in successfully.',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
}

export default AuthController;
