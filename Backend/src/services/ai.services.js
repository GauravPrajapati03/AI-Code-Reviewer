const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



async function generateResponse(code) {
    try {
        const result = await model.generateContent(code);
        return (result.response.text());
    } catch (error) {
        console.error('Error while generating Content:', error);
        throw error;
    }
}

module.exports =  generateResponse;