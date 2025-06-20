// pages/api/proxy-login.ts

export default async function handler(req, res) {
  if (req.method === "POST") {
    const apiRes = await fetch("https://citypulse.runasp.net/api/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
