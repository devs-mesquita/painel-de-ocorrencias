// import { prisma } from "@/server/db";
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";

export default async function TargetHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const panic = req.body;

    // const newEntry = await prisma.entry.create({
    //   data: {
    //     json: JSON.stringify(data),
    //   },
    // });

    res.socket.server.io.emit("new-panic", panic);

    return res.status(200).json(panic);
  } catch (error) {
    return res.status(500).json(error);
  }
}
