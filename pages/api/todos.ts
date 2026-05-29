import type { NextApiRequest, NextApiResponse } from "next";
import { getHygraphClient, userTodosQuery, type UserTodosResponse } from "@/lib/hygraph";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const ownerEmail = typeof req.query.ownerEmail === "string" ? req.query.ownerEmail : "";
  if (!ownerEmail) {
    res.status(400).json({ message: "ownerEmail is required" });
    return;
  }

  try {
    const client = getHygraphClient();
    const data = await client.request<UserTodosResponse>(userTodosQuery, { ownerEmail });
    res.status(200).json(data.todos);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unable to fetch TODOs"
    });
  }
}
