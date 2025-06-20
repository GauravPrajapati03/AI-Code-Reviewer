const aiService = require("../services/ai.services");

const getResponse = async (req, res) => {
    const code = req.body.code;
    // console.log(code)

    if(!code) {
        return res.status(400).json({message: "Please enter a prompt"});
    }

    const response = await aiService(code)
    res.send(response);

    // console.log("Response Sent");
}


module.exports = getResponse ;