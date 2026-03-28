const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).json({
            success: false,
            error: "Code is required"
        });
    }

    try {
        const response = await aiService(code);

        return res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error("AI service error:", error);

        //  HANDLE GEMINI QUOTA ERROR
        if (error.message.includes("429")) {
            return res.status(429).json({
                success: false,
                error: "API quota exceeded. Please try again later."
            });
        }

        //  GENERAL ERROR
        return res.status(500).json({
            success: false,
            error: "Something went wrong while generating the review."
        });
    }
};