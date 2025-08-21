import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditBalance < 2) {
      return res.json({
        success: false,
        message:
          "Insufficient credits! You need at least 2 credits to generate an image.",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    // API CALL USING CLIPDROP -->>
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    const newCreditBalance = user.creditBalance - 2;
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: newCreditBalance,
    });

    res.json({
      success: true,
      message: "Image Generated Successfully! 2 credits deducted.",
      creditBalance: newCreditBalance,
      resultImage,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
