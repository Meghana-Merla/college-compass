import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { state, budget, type } = await req.json();

    const colleges = await prisma.college.findMany({
      where: {
        ...(state && { state }),
        ...(type && { type }),
        ...(budget && {
          fees: {
            lte: Number(budget),
          },
        }),
      },
      orderBy: {
        rating: "desc",
      },
      take: 15,
    });

    if (colleges.length === 0) {
      return NextResponse.json({
        response: "No colleges found matching your preferences.",
      });
    }

    const collegeData = colleges
      .map(
        (c) => `
Name: ${c.name}
State: ${c.state}
City: ${c.city}
Type: ${c.type}
Fees: ₹${c.fees}
Rating: ${c.rating}
Average Package: ${c.averagePackage} LPA
NIRF Rank: ${c.nirfRank}
Description: ${c.description}
`
      )
      .join("\n------------------\n");

    const prompt = `
You are an expert college counselor.

Below are colleges from our database.

Recommend the BEST 5 colleges.

For each college provide:

• Why recommended
• Average Package
• Fees
• Rating

Use ONLY the data provided below.

${collegeData}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    return NextResponse.json({
      response: result.response.text(),
    });
  } catch (err) {
    console.log(err);

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