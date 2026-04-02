export async function onRequestPost(context) {
  const { request, env } = context;

  const body = await request.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: body.messages
    })
  });

  return new Response(await response.text(), {
    headers: { "Content-Type": "application/json" }
  });
}