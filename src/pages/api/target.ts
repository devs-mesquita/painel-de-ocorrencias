import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";
import { z } from "zod";
import { panicInfo, extractTypesFromZodObject } from "@/types/interfaces";
// import { prisma } from "@/server/db";

export default async function TargetHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const panic = req.body;

    const result = panicInfo.safeParse(panic);

    if (!result.success) {
      return res.status(400).json({
        message: "Your request body doesn't match the API's expectations.",
        expected: extractTypesFromZodObject(panicInfo),
        received: panic,
      });
    }

    // const newEntry = await prisma.entry.create({
    //   data: {
    //     json: JSON.stringify(data),
    //   },
    // });

    res.socket.server.io.emit("new-panic", panic);

    return res.status(200).json({
      message: "Success!",
      received: panic,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
