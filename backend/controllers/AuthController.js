import dbClient from '../utils/db';
import sha1 from 'sha1';
import { generateToken } from '../utils/jwt';

class AuthController {
  // Login a User
  static async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing Email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing Password' });
    }

    const hashPassword2 = sha1(password);

    try {
      const user = await dbClient.db
        .collection('users')
        .findOne({ email, password: hashPassword2 });

      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }

      const token = generateToken({ email: user.email });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error Logging in User:', error);
      res.status(502).json({ error: 'Internal server error' });
    }
  }
}

export default AuthController;
