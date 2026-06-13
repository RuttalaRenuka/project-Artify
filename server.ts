import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { products } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API Check/Health
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // AI Assistant Chat Route
  app.post("/api/chat", async (req: Request, res: Response): Promise<any> => {
    try {
      const { messages, userMessage } = req.body;

      if (!userMessage) {
        return res.status(400).json({ error: "Missing userMessage field" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "To activate the intelligent AI Assistant, please configure your GEMINI_API_KEY in the Settings > Secrets tab."
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Filter products list to avoid sending too much token bloat, while maintaining full catalog awareness
      const catalogInfo = products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        categoryLabel: p.categoryLabel,
        price: `₹${p.price}`,
        availability: p.availability,
        sku: p.sku,
        description: p.description,
        isBestSeller: p.isBestSeller,
        isNewArrival: p.isNewArrival
      }));

      const systemInstruction = `You are "Artify Creative Tutor", a modern, friendly and highly professional AI assistant for "Artify" website.
Your vibe is creative, encouraging, sophisticated and helpful.

Key website offerings & promotions:
1. Special promo code "CREATIVE10" gives 10% off on first checkout.
2. Promo code "ARTIFYMASTER" gives 20% off on all studio orders above ₹100.
3. Shipping is 100% FREE nationwide for orders exceeding ₹50. Standard orders below ₹50 incur nominal secure packaging and delivery rates.
4. "Paint Mixology Lab" page widget lets users mix custom colors live in 3D, wet-sealed in 50ml jars ($18.99).

Here is the exact catalog of available products at our store. When the user asks about supplies, paints, canvas, brushes, clay, or other crafts, recommend matching products from this real list with their prices:
${JSON.stringify(catalogInfo, null, 2)}

Instructions:
1. Provide highly creative, practical and encouraging tips for any art medium or technique questions (like color combining, oil textures, watercolor washes, resin bubble removing).
2. Recommend actual matching products from our list! Always refer to real item names and exact prices.
3. Share the promo codes (CREATIVE10 or ARTIFYMASTER) when relevant to help them save.
4. Keep answers elegant, structured with bullet points where appropriate, and relatively concise (not overly long) so they fit nicely in a chat window. Use markdown for styling (like bold text or simple clean tables).
5. If someone asks about items we don't have, politely guide them to our actual list and suggest the closest creative alternative we sell.
6. Return only standard text response in Markdown format.`;

      // Build context history
      // Keep only last 10 messages to protect token limits
      const contextMessages = Array.isArray(messages) ? messages.slice(-10) : [];
      const historyText = contextMessages
        .map((msg: any) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
        .join("\n");

      const prompt = `System Instruction Context:
${systemInstruction}

Conversation History:
${historyText}

User Prompt: ${userMessage}
Assistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const responseText = response.text || "I apologize, let's try that again. How can I inspire your art today?";
      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({
        error: "Failed to query AI Assistant. Please ensure your GEMINI_API_KEY is active and valid."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer();
