// api/image.js
export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt;
    if (!prompt) return res.status(400).send("Missing prompt");

    const remoteUrl = `https://yabes-api.pages.dev/api/ai/image/imagen3-0?prompt=${encodeURIComponent(prompt)}`;
    const response = await fetch(remoteUrl);

    if (!response.ok) {
      return res.status(response.status).send("Image API error");
    }

    res.setHeader("Content-Type", response.headers.get("content-type") || "image/jpeg");
    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Server error: " + err.message);
  }
}
