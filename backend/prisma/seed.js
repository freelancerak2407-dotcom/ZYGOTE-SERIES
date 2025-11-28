"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const prisma = new client_1.PrismaClient();
async function main() {
    const adminEmail = process.env.ADMIN_USERNAME || 'admin@zygote.com'; // Using email field for username as per schema
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    console.log(`Seeding admin user: ${adminEmail}`);
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword,
            role: client_1.Role.ADMIN,
        },
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: 'Super Admin',
            role: client_1.Role.ADMIN,
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
            role: client_1.Role.STUDENT,
        },
        create: {
            email: studentEmail,
            password: hashedStudentPassword,
            name: 'Student User',
            role: client_1.Role.STUDENT,
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
