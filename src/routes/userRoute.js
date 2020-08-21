import {
  Router
} from 'express'
import passport from 'passport'
import UserController from '../controllers/userController'
import '../passport'

const router = Router()

router.route('/user').get(passport.authenticate('jwt', {
  session: false
}), UserController.fetchAllUser)

router.route('/user/:id').get(passport.authenticate('jwt', {
  session: false
}), UserController.fetchSingleUser)
  .put(passport.authenticate('jwt', {
    session: false
  }), UserController.updateUser)
  .delete(passport.authenticate('jwt', {
    session: false
  }), UserController.deleteUser)

export default router
