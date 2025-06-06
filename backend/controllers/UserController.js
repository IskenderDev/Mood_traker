import dbClient from '../utils/db';
import sha1 from 'sha1';

class UserController {
  // Create a New User
  static async createUser(req, res) {
    const { fullName, email, password } = req.body;

    if (!fullName) return res.status(400).json({ error: 'Missing fullname' });
    if (!email) return res.status(400).json({ error: 'Missing Email' });
    if (!password) return res.status(400).json({ error: 'Missing Password' });

    const userExist = await dbClient.db.collection('users').findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: 'User Already Exist' });
    }
    const hashPassword = sha1(password);

    try {
      const result = await dbClient.db
        .collection('users')
        .insertOne({ fullName, email, password: hashPassword });

      return res.status(201).json({
        id: result.insertedId,
        email,
        message: 'User Created Successfully',
      });
    } catch (error) {
      console.error('Error Creating User:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Gets the Current User Details
  static async getUser(req, res) {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized User' });
    }

    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
    });
  }
}

export default UserController;
