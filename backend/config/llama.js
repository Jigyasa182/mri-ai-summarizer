const axios = require("axios");

const callLLama = async (prompt) => {
  try {
    const model = "meta-llama/Llama-3.2-3B-Instruct";
    console.log(`Calling HF Router API with model: ${model}`);

    const response = await axios.post(
      `https://router.huggingface.co/v1/chat/completions`,
      {
        model: model,
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000
      }
    );

    console.log("HF API Response Status:", response.status);

    const generatedText = response.data.choices?.[0]?.message?.content;

    if (!generatedText) {
      console.error("Empty AI response:", response.data);
      throw new Error("AI returned empty content");
    }

    return generatedText;
  } catch (error) {
    console.error(
      "HF API error:",
      error.response?.data || error.message
    );

    const hfError = error.response?.data?.error;
    if (typeof hfError === 'string' && hfError.includes("loading")) {
      throw new Error("AI model is currently waking up. Please try again in 30 seconds.");
    }

    throw new Error(hfError || error.message || "AI service failed to respond");
  }
};

module.exports = callLLama;
