import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const college = await prisma.college.findUnique({
      where: {
        id,
      },
    });

    if (!college) {
      return NextResponse.json(
        {
          error: "College not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch college",
      },
      {
        status: 500,
      }
    );
  }
}