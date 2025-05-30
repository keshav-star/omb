import { PrismaClient, PlanType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Entrepreneurs',
        description: 'Successful business founders and leaders',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Artists',
        description: 'Creative professionals and performers',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Scientists',
        description: 'Researchers and innovators',
      },
    }),
  ]);

  // Create plans
  const plans = await Promise.all([
    prisma.plan.create({
      data: {
        name: 'Basic',
        description: 'Access to 10 bios per month',
        price: 9.99,
        type: PlanType.SUBSCRIPTION,
        credits: 10,
      },
    }),
    prisma.plan.create({
      data: {
        name: 'Premium',
        description: 'Unlimited access to all bios',
        price: 29.99,
        type: PlanType.SUBSCRIPTION,
      },
    }),
    prisma.plan.create({
      data: {
        name: 'Lifetime',
        description: 'One-time payment for lifetime access',
        price: 299.99,
        type: PlanType.LIFETIME,
      },
    }),
  ]);

  // Create a test user
  const hashedPassword = await bcrypt.hash('test123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    },
  });

  // Create some sample bios
  const bios = await Promise.all([
    prisma.bio.create({
      data: {
        name: 'Elon Musk',
        summary: 'Tech entrepreneur and CEO of Tesla and SpaceX',
        story: 'From PayPal to Tesla and SpaceX, Elon Musk has revolutionized multiple industries...',
        categories: {
          connect: [{ id: categories[0].id }],
        },
        featured: true,
      },
    }),
    prisma.bio.create({
      data: {
        name: 'Frida Kahlo',
        summary: 'Mexican artist known for her self-portraits',
        story: 'Frida Kahlo\'s life was marked by pain and passion, reflected in her iconic artwork...',
        categories: {
          connect: [{ id: categories[1].id }],
        },
      },
    }),
  ]);

  // Create a favorite
  await prisma.favorite.create({
    data: {
      userId: user.id,
      bioId: bios[0].id,
    },
  });

  // Create a newsletter subscription
  await prisma.newsletterSubscription.create({
    data: {
      email: user.email,
      userId: user.id,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 