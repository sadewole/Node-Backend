import model from '../db';
import Helper from '../middlewares/helpers';
import Token from '../middlewares/token';

const { User } = model;

class UserController {
  static async fetchAllUser(req, res) {
    try {
      const user = await User.findAll({});

      res.status(200).json({
        status: 'success',
        data: user,
        message: 'Fetched successfully',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async fetchSingleUser(req, res) {
    try {
      const { id } = req.params;
      const existUser = await Helper.existUserById(id);
      if (!existUser) {
        return res.status(404).json({
          status: 'error',
          message: 'User does not exist',
        });
      }

      res.status(200).json({
        status: 'success',
        data: existUser,
        message: 'Fetched successfully',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { fname, lname, phone } = req.body;
      if (!name) {
        return res.status(400).json({
          status: 'error',
          message: 'Field is not allowed to be empty',
        });
      }
      const existUser = await Helper.existUserById(id);
      if (existUser) {
        const updateUser = await User.update(
          {
            fname,
            lname,
            phone,
          },
          {
            returning: true,
            where: {
              id,
            },
          }
        );

        // gen token
        const token = await Token.generateToken(updateUser);

        return res.status(200).json({
          status: 'success',
          message: 'Name changed successfully',
          data: updateUser[1][0],
          token: `Bearer ${token}`,
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const existUser = await Helper.existUserById(id);
      if (!existUser) {
        return res.status(404).json({
          status: 'error',
          message: 'User does not exist',
        });
      }

      await User.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        status: 'success',
        message: 'Deleted successfully',
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
}

export default UserController;
