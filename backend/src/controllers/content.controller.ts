import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

export const getSubjects = async (req: Request, res: Response) => {
  const subjects = await prisma.subject.findMany({
    orderBy: { order: 'asc' },
    include: {
      chapters: {
        select: { id: true, title: true, _count: { select: { subtopics: true } } }
      }
    }
  });
  res.json(subjects);
};

export const getSubtopicDetails = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  const subtopic = await prisma.subtopic.findUnique({
    where: { id },
    include: { mcqs: true }
  });

  if (!subtopic) return res.status(404).json({ message: 'Not found' });

  // Check if user has completed this
  const progress = userId ? await prisma.userProgress.findUnique({
    where: { userId_subtopicId: { userId, subtopicId: id } }
  }) : null;

  res.json({ ...subtopic, isCompleted: progress?.isCompleted || false });
};

export const markComplete = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.userId;

  await prisma.userProgress.upsert({
    where: { userId_subtopicId: { userId, subtopicId: id } },
    update: { isCompleted: true, lastReadAt: new Date() },
    create: { userId, subtopicId: id, isCompleted: true }
  });

  res.json({ success: true });
};
