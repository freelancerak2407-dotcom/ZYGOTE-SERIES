# Zygote Series - Backend (Stage 3)

Node.js + Express + TypeScript + Prisma backend.

## Setup

1. **Install Dependencies:**
   \`\`\`bash
   cd backend
   yarn install
   \`\`\`

2. **Database Setup:**
   - Ensure PostgreSQL is running.
   - Create a database named \`zygote_db\`.
   - Update \`.env\` with your credentials.

3. **Run Migrations & Seed:**
   \`\`\`bash
   npx prisma migrate dev --name init
   npx prisma db seed
   \`\`\`
   *This creates the admin user defined in .env*

4. **Start Server:**
   \`\`\`bash
   yarn dev
   \`\`\`

## API Overview

- **Auth:** \`POST /api/auth/login\`
- **Content:** \`GET /api/subjects\`
- **Admin:** \`POST /api/admin/upload-url\` (Requires Bearer Token with ADMIN role)

## Key Features
- **RBAC:** Middleware checks for ADMIN/EDITOR roles.
- **S3 Uploads:** Generates pre-signed URLs for direct client uploads.
- **Prisma:** Full schema for Medical curriculum.
