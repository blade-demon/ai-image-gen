const { Configuration, OpenAIApi } = require("openai");
const openaiKey = process.env.OPEN_API_KEY;
console.log(openaiKey);
const configuration = new Configuration({
  apiKey: openaiKey,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  try {
    const { prompt, size } = req.body;
    const imageSize =
      size === "small"
        ? "256x256"
        : size === "medium"
        ? "512x512"
        : "1024x1024";
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });
    const imageUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
    res.status(400).json({
      success: false,
      error: "The image could not be generated.",
    });
  }
};

module.exports = { generateImage };
