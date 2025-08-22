// app/api/translate/route.js
export async function POST(req) {
  try {
    const { text, targetLang } = await req.json();

    if (!text || !targetLang) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a medical translation assistant. Translate into ${targetLang} with accurate medical terminology.`
          },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content || "Translation failed";

    return new Response(JSON.stringify({ translatedText }), { status: 200 });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(JSON.stringify({ error: "Translation failed" }), { status: 500 });
  }
}
