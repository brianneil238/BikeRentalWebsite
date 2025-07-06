const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bikeUpdates = [
  { id: 1, name: "BSU 001" },
  { id: 2, name: "BSU 002" },
  { id: 3, name: "BSU 003" },
  { id: 4, name: "BSU 004" },
  { id: 5, name: "BSU 005" },
  { id: 6, name: "BSU 006" },
  { id: 7, name: "BSU 007" },
  { id: 8, name: "BSU 008" },
  { id: 9, name: "BSU 009" },
  { id: 10, name: "BSU 010" }
];

async function updateBikeNames() {
  try {
    console.log('🔄 Updating bike names to BSU plate numbers...');
    
    // First, let's see what bikes we currently have
    const existingBikes = await prisma.bike.findMany({
      orderBy: { createdAt: 'asc' }
    });
    
    console.log(`Found ${existingBikes.length} bikes in database`);
    
    // Update each bike with the new BSU plate number
    for (let i = 0; i < existingBikes.length && i < bikeUpdates.length; i++) {
      const bike = existingBikes[i];
      const newName = bikeUpdates[i].name;
      
      await prisma.bike.update({
        where: { id: bike.id },
        data: { name: newName }
      });
      
      console.log(`✅ Updated bike ${bike.id} from "${bike.name}" to "${newName}"`);
    }
    
    console.log('🎉 All bike names updated successfully!');
    
    // Show final result
    const updatedBikes = await prisma.bike.findMany({
      orderBy: { name: 'asc' }
    });
    
    console.log('\n📋 Current bikes in database:');
    updatedBikes.forEach(bike => {
      console.log(`  - ${bike.name} (Status: ${bike.status})`);
    });
    
  } catch (error) {
    console.error('❌ Error updating bike names:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBikeNames(); 