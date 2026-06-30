import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { college1, college2 } = await req.json();

    const colleges = [college1, college2];

const prompt = `
You are an expert college counselor.

Compare these two colleges.

${JSON.stringify(colleges, null, 2)}

Return the answer in Markdown using this exact format.

# 🏆 AI Comparison

## Quick Verdict
(2-3 sentences)

## Comparison Table

| Feature | College 1 | College 2 |
|---------|-----------|-----------|
| NIRF Rank | | |
| Rating | | |
| Fees | | |
| Average Package | | |

## Pros of ${college1.name}
- point
- point
- point

## Pros of ${college2.name}
- point
- point
- point

## Final Recommendation

Recommend one college with a short explanation.

Keep the response under 300 words.
Don't repeat information.
Be concise and professional.
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