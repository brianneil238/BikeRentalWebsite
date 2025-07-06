import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bikes = await prisma.bike.findMany({
      orderBy: { name: 'asc' },
      include: {
        applications: {
          where: { bikeId: { not: null } },
          orderBy: { createdAt: 'desc' },
          take: 1,
        }
      }
    });
    return NextResponse.json({ success: true, bikes });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 