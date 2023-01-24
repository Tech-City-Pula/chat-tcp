import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(process.env.CHAT_GPT_MODELS_ENDPOINT!, {
      headers: { authorization: `Bearer ${process.env.CHAT_GPT_KEY}` },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
