import { Request, Response } from 'express';
import { generatePresignedUrl } from '../services/s3.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUploadUrl = async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;
  if (!fileName || !fileType) return res.status(400).json({ message: 'Missing file info' });

  try {
    const data = await generatePresignedUrl(fileName, fileType);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate upload URL' });
  }
};

export const triggerImport = async (req: Request, res: Response) => {
  const { fileUrl, type, userId } = req.body;
  
  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  // In a real app, this would add a job to a BullMQ queue
  // For now, we just create a record
  const job = await prisma.importJob.create({
    data: {
      type,
      fileUrl,
      status: 'PENDING',
      userId
    }
  });

  res.json({ message: 'Import job started', jobId: job.id });
};
