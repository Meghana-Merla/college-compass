import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Fetch colleges from database
    const colleges = await prisma.college.findMany({
      select: {
        name: true,
        city: true,
        state: true,
        type: true,
        fees: true,
        rating: true,
        nirfRank: true,
        averagePackage: true,
        website: true,
        description: true,
      },
      take: 50,
    });

    // Convert DB data into text
    const collegeData = colleges
      .map(
        (c) => `
Name: ${c.name}
City: ${c.city}
State: ${c.state}
Type: ${c.type}
Fees: ${c.fees ?? "N/A"}
Rating: ${c.rating ?? "N/A"}
NIRF Rank: ${c.nirfRank ?? "N/A"}
Average Package: ${c.averagePackage ?? "N/A"} LPA
Website: ${c.website ?? "N/A"}
Description: ${c.description ?? "N/A"}
`
      )
      .join("\n----------------------\n");

    // Create AI prompt
    const prompt = `
You are College Compass AI.

Use ONLY the college data provided below whenever possible.

If the information is not available in the data, reply:
"I couldn't find this information in the College Compass database."

College Data:
${collegeData}

User Question:
${message}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}