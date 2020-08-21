import passport from 'passport'
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt'
import {
  Strategy as LocalStrategy
} from 'passport-local'
import model from './db'
import Helper from './middlewares/helpers'

const {
  User
} = model

// init passport JwtStrategy to verify token
passport.use('verify', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter,
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findOne({
      where: {
        id: payload.sub
      }
    })

    //  confirm user existence
    if (!user) return done(null, false)

    return done(null, user)
  } catch (error) {
    done(error, false, error.message)
  }
}))

// init passport JwtStrategy to Auth user
passport.use(
  'jwt',
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findOne({
        where: {
          id: payload.sub
        }
      })

      //  confirm user existence
      if (!user) return done(null, false)

      return done(null, user)
    } catch (error) {
      done(error, false, error.message)
    }
  }
  )
)

passport.use(
  'local',
  new LocalStrategy({
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      email = email.toLowerCase().trim()
      const user = await Helper.existEmail(email)
      if (!user) return done(null, false)

      const comparePassword = await Helper.comparePassword(
        password,
        user.password
      )
      if (!comparePassword) return done(null, false)

      done(null, user)
    } catch (err) {
      done(err, false, err.message)
    }
  }
  )
)
