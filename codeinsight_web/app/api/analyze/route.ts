import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { code } = await req.json();
  
      const prompt = `
      You are a JavaScript expert reviewing code for a beginner.
      Analyze the following JavaScript code and provide:
      
      For each suggestion, **start with one of these labels**:
      - [Readability] if it's about formatting or naming conventions.
      - [Best Practice] if it's about modern JavaScript standards.
      - [Security] if it's about security risks (only if relevant).
      - [Performance] if it's about optimization (only if relevant).

      If the code is short and doesn't involve user input or loops, skip security and performance sections.
  
      Give clear, **concise** suggestions, and provide an improved version of the code if applicable.

      ❌ Do NOT use numbered lists or extra explanations—just give suggestions using the format:  
      **[Category] Suggestion text**.
  
      Here is the code to analyze:
      ${code}
      `;
  
      const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.DEEPINFRA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.1",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3, 
        }),
      });
  
      const data = await response.json();
      const suggestions = data.choices?.[0]?.message?.content?.split("\n") || ["No suggestions found."];
  
      return NextResponse.json({ suggestions });
    } catch (error) {
      return NextResponse.json({ error: "Failed to analyze code" }, { status: 500 });
    }
  }
  