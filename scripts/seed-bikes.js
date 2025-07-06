const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bikes = [
  {
    name: "BSU 001",
    status: "available"
  },
  {
    name: "BSU 002",
    status: "available"
  },
  {
    name: "BSU 003",
    status: "available"
  },
  {
    name: "BSU 004",
    status: "available"
  },
  {
    name: "BSU 005",
    status: "available"
  },
  {
    name: "BSU 006",
    status: "available"
  },
  {
    name: "BSU 007",
    status: "available"
  },
  {
    name: "BSU 008",
    status: "available"
  },
  {
    name: "BSU 009",
    status: "available"
  },
  {
    name: "BSU 010",
    status: "available"
  }
];

async function seedBikes() {
  try {
    console.log('🌱 Seeding bikes...');
    
    for (const bike of bikes) {
      await prisma.bike.create({
        data: bike
      });
      console.log(`✅ Added bike: ${bike.name}`);
    }
    
    console.log('🎉 All bikes seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding bikes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBikes(); 