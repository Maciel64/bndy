import bcrypt from 'bcrypt'
import { connection } from '../../../memoryDB/connection'
import { User } from '../../../models/User'

export const login = async (_parent, args, _context, _info) => {
  const { email, password } = args

  await connection()

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Usuário ou senha inválidos')
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new Error('Usuário ou senha inválidos')
  }

  return user
}
