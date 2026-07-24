import { getStore } from "@netlify/blobs";

const KEY = "pf4";

export default async (req) => {
  const store = getStore("portfolio");

  if (req.method === "GET") {
    const value = await store.get(KEY);
    return new Response(value ?? "null", {
      headers: { "content-type": "application/json" },
    });
  }

  if (req.method === "POST") {
    const body = await req.text();
    try {
      JSON.parse(body);
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    await store.set(KEY, body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/portfolio-data" };
