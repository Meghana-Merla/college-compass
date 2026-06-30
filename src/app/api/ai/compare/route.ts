import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { college1, college2 } = await req.json();

    const colleges = await prisma.college.findMany({
      where: {
        name: {
          in: [college1, college2],
        },
      },
      select: {
        name: true,
        city: true,
        state: true,
        fees: true,
        rating: true,
        nirfRank: true,
        averagePackage: true,
        description: true,
      },
    });

    if (colleges.length < 2) {
      return NextResponse.json({
        response: "Both colleges were not found in the database.",
      });
    }

    const prompt = `
You are an expert education counselor.

Compare these two colleges.

${JSON.stringify(colleges, null, 2)}

Compare them based on:

1. Placements
2. Fees
3. NIRF Rank
4. Rating
5. Overall Recommendation

Finally recommend which student should choose which college.
Return the response in Markdown.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    return NextResponse.json({
      response: result.response.text(),
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}