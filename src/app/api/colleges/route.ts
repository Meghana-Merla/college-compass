import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const type = searchParams.get("type") || "";
    const sort = searchParams.get("sort") || "";
    const order = (searchParams.get("order") || "asc") as "asc" | "desc";

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const skip = (page - 1) * limit;

    const where = {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },

      ...(state && {
        state: {
          equals: state,
          mode: "insensitive" as const,
        },
      }),

      ...(type && {
        type: {
          equals: type,
          mode: "insensitive" as const,
        },
      }),
    };

    const orderBy =
      sort === "rating"
        ? { rating: order }
        : sort === "fees"
        ? { fees: order }
        : sort === "averagePackage"
        ? { averagePackage: order }
        : sort === "nirfRank"
        ? { nirfRank: order }
        : sort === "name"
        ? { name: order }
        : undefined;

    const colleges = await prisma.college.findMany({
      where,
      ...(orderBy && { orderBy }),
      skip,
      take: limit,
    });

    const total = await prisma.college.count({
      where,
    });

    return NextResponse.json({
      colleges,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch colleges",
      },
      {
        status: 500,
      }
    );
  }
}