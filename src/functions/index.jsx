let calls = 0;
export const getQuote = async (model) => {
  const prompt =
    "Give me a random insulting quote that appears motivational but includes humorous, sarcastic, or insulting twists.";
  let response;
  if (calls === 1) return undefined;
  do {
    response = await model.generateContent(prompt);
    if (
      response.response.candidates[0]["finishReason"] === "STOP" &&
      calls === 0
    ) {
      calls += 1;
      return response.response.candidates[0].content.parts[0].text;
    } else if (calls === 1) return undefined;
  } while (response.response.candidates[0]["finishReason"] !== "STOP");
};
