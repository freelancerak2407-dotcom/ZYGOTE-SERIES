import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { comparePassword, generateTokens, hashPassword } from '../utils/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = registerSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  const tokens = generateTokens(user.id, user.role);
  res.json({ user: { id: user.id, email: user.email, role: user.role }, ...tokens });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const tokens = generateTokens(user.id, user.role);
  res.json({ user: { id: user.id, email: user.email, role: user.role }, ...tokens });
};
