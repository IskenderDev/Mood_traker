import jwt from 'jsonwebtoken';
import dbClient from './db';
import { configDotenv } from 'dotenv';

configDotenv();

const secret = process.env.JWT_SECRET;

// Generate a new token
export function generateToken(payload) {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '3h' });
}

// Verify token
export function verifyToken(token) {
  try {
    const data = jwt.verify(token, secret, { algorithm: 'HS256' });
    return data;
  } catch (e) {
    return null;
  }
}

// Authenticate token and Return Current User
export async function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Missing Token' });

  const data = verifyToken(token);
  if (!data) return res.status(401).json({ error: 'Invalid Token' });

  const user = await dbClient.db
    ?.collection('users')
    .findOne({ email: data.email });
  if (!user) return res.status(401).json({ error: 'Invalid Token' });

  req.user = user;
  next();
}
