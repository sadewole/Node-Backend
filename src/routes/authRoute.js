import { Router } from 'express';
import AuthController from '../controllers/authController';
import Helper from '../middlewares/helpers';
import passport from 'passport';
import '../passport';

const router = Router();

router.post(
  '/auth/signup',
  Helper.validateBody(Helper.schemas.authSchema),
  AuthController.signUp
);

router.post(
  '/auth/signin',
  passport.authenticate('local', {
    session: false,
  }),
  Helper.validateBody(Helper.schemas.signSchema),
  AuthController.signIn
);

// Routes get secretPass
// Access private
router.route('/auth/secret').get(
  passport.authenticate('jwt', {
    session: false,
  }),
  AuthController.secret
);

export default router;
