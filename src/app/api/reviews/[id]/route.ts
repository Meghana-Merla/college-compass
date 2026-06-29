import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token) as {
      userId: string;
    } | null;

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    if (review.userId !== payload.userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.review.delete({
      where: {
        id,
      },
    });

    // Recalculate average rating
    const stats = await prisma.review.aggregate({
      where: {
        collegeId: review.collegeId,
      },
      _avg: {
        rating: true,
      },
    });

    await prisma.college.update({
      where: {
        id: review.collegeId,
      },
      data: {
        rating: stats._avg.rating ?? null,
      },
    });

    return NextResponse.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}