import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🚀 Received API request:", body);

    const { messages, apiKey } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    console.log("📡 Sending request to OpenAI:", messages);

    const chatCompletion = await openai.chat.completions.create({
      messages: messages.map(({ role, content }) => ({ role, content })),
      model: "gpt-4o",
      temperature: 1,
    });

    console.log("🛑 OpenAI Raw Response:", chatCompletion);

    const responseMessage = chatCompletion.choices?.[0]?.message?.content;

    if (!responseMessage) {
      console.error("❌ OpenAI response is empty!", chatCompletion);
      return new Response(
        JSON.stringify({ error: "OpenAI returned an empty response." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("✅ OpenAI Response:", responseMessage);

    // ✅ Return response in expected format
    return new Response(
      JSON.stringify({
        id: chatCompletion.id, // Ensure an ID is included
        content: responseMessage,
        role: "assistant", // OpenAI convention, not "bot"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("🔥 API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
