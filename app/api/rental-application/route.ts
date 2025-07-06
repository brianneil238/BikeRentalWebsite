import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const application = await prisma.bikeRentalApplication.create({
      data: {
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
        srCode: data.srCode,
        sex: data.sex,
        dateOfBirth: new Date(data.dateOfBirth),
        phoneNumber: data.phoneNumber,
        email: data.email,
        collegeProgram: data.collegeProgram,
        gwaLastSemester: data.gwaLastSemester,
        extracurricularActivities: data.extracurricularActivities,
        houseNo: data.houseNo,
        streetName: data.streetName,
        barangay: data.barangay,
        municipality: data.municipality,
        province: data.province,
        distanceFromCampus: data.distanceFromCampus,
        familyIncome: data.familyIncome,
        intendedDuration: data.intendedDuration,
        intendedDurationOther: data.intendedDurationOther,
        // bikeId is not set at this stage
      },
    });
    return NextResponse.json({ success: true, application });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 