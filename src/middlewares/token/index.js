import jwt from 'jsonwebtoken'
import 'dotenv/config'

const nextDay = new Date().setDate(new Date().getDate() + 1)

class Token {
  static async generateToken (payload, exp = nextDay) {
    const details = {
      iss: 'codeSecret',
      sub: payload.id,
      iat: new Date().getTime(),
      exp
    }

    const token = await jwt.sign(details, process.env.JWT_SECRET)

    return token
  }
}

export default Token
