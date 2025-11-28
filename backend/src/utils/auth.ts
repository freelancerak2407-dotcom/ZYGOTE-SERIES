import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ userId, role }, config.jwtSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, config.jwtRefreshSecret, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};
