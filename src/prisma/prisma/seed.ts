console.log('*** seed.ts is running ***');

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@chaishots.test';
  const password = 'Admin123!';
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: Role.ADMIN,
      },
    });
    console.log('Seeded admin user');
  } else {
    console.log('Admin user already exists');
  }

  await prisma.order.createMany({
    data: [
      { customer: 'Arjun Mehta', status: 'COMPLETED', amount: 450 },
      { customer: 'Priya Shah', status: 'PENDING', amount: 320 },
      { customer: 'Rohan Patil', status: 'COMPLETED', amount: 210 },
    ],
  });

  console.log('Seeded orders');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
