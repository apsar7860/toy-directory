import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password }: RegisterRequest = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', details: (error as Error).message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login', details: (error as Error).message });
  }
});

export default router;
