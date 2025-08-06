// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/generate-review", async (req, res) => {
  const {
    product,
    useCase,
    experience,
    issues,
    recommend,
    toneExample,
    tone,
  } = req.body;

  const prompt = `
You are my Amazon review assistant.

Use the product info I provide and my experience to write a helpful, honest, and structured review.

Tone: ${tone}

Focus on:
- What problem the product solved
- My actual experience using it
- Pros and cons
- Who this would or wouldn’t be good for
- Whether I would recommend it

Here is the info:
Product: ${product}
Use case: ${useCase}
Experience: ${experience}
Issues: ${issues}
Would recommend? ${recommend}
Tone match example: “${toneExample}”
`;

  const response = await openai.createChatCompletion({
    model: "gpt-4", // or "gpt-3.5-turbo"
    messages: [{ role: "user", content: prompt }],
  });

  res.json({ review: response.data.choices[0].message.content });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
