import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'sdobsulipa@g.batstate-u.edu.ph';
  const password = 'sdobikerentallipa';
  const role = 'admin';
  const name = 'Admin User';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashed,
        role,
        name,
      },
    });
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect()); 