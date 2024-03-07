import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

import post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(response);
    const image = response.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
export default router;
