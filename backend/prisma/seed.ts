import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_USERNAME || 'admin@zygote.com'; // Using email field for username as per schema
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  console.log(`Seeding admin user: ${adminEmail}`);

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: Role.ADMIN,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Super Admin',
      role: Role.ADMIN,
    },
  });

  console.log('Admin user created/updated:', admin.id);

  // Seed a sample student user if not present
  const studentEmail = process.env.STUDENT_USERNAME || 'student@zygote.com';
  const studentPassword = process.env.STUDENT_PASSWORD || 'student123';
  const hashedStudentPassword = await bcrypt.hash(studentPassword, 10);

  const student = await prisma.user.upsert({
    where: { email: studentEmail },
    update: {
      password: hashedStudentPassword,
      role: Role.STUDENT,
    },
    create: {
      email: studentEmail,
      password: hashedStudentPassword,
      name: 'Student User',
      role: Role.STUDENT,
    },
  });
  console.log('Student user created/updated:', student.id);

  // Seed some dummy subjects if empty
  const count = await prisma.subject.count();
  if (count === 0) {
    console.log('Seeding initial subjects...');
    await prisma.subject.create({
      data: {
        title: 'Human Anatomy',
        slug: 'human-anatomy',
        year: 1,
        chapters: {
          create: [
            {
              title: 'Upper Limb',
              subtopics: {
                create: [
                  { title: 'Pectoral Region', contentNote: '<h1>Pectoral Region</h1><p>Details here...</p>' },
                  { title: 'Axilla' },
                  { title: 'Brachial Plexus' }
                ]
              }
            },
            {
              title: 'Lower Limb',
              subtopics: {
                create: [{ title: 'Front of Thigh' }]
              }
            }
          ]
        }
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
