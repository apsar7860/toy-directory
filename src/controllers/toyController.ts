import { Router } from 'express';
import { PrismaClient, Toy } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface CreateToyRequest {
  name: string;
  details: string;
  userId: number;
}

router.post('/', async (req, res) => {
  try {
    const { name, details, userId }: CreateToyRequest = req.body;
    if (typeof userId !== 'number') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const toy = await prisma.toy.create({
      data: { name, details, userId },
    });
    res.status(201).json(toy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add toy', details: (error as Error).message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const toy = await prisma.toy.findUnique({
      where: { name },
    });
    if (toy) {
      res.status(200).json(toy);
    } else {
      res.status(404).json({ message: 'Toy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve toy', details: (error as Error).message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, details } = req.body;
    const toy = await prisma.toy.update({
      where: { id: Number(id) },
      data: { name, details },
    });
    res.status(200).json(toy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update toy', details: (error as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.toy.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete toy', details: (error as Error).message });
  }
});

export default router;
