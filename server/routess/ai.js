import express from "express";
import axios from "axios";

const rout = express.Router();

rout.post("/ask-ai", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post("http://127.0.0.1:5001/chat", {
      message,
    });
    res.json({
      success: true,
      aiResponse: response.data.reply,
    });
  } catch (err) {
    res.status(500).json({ message: "errror in internal" });
  }
});
export default rout;
