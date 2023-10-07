const Office = require("../models/Office");
const User = require("../models/User");

const postOfficeImages = async (req, res) => {
  const userData = await User.find({ email: req.body.uploadedEmail });
  
  const dataInfo = {
    url: req.body?.url,
    uploadedBy: userData && userData[0]?._id,
  };
  const result = await Office.create(dataInfo);

  console.log("result", result);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Image Submited Successfully",
    data: result,
  });
};

const getOfficeImages = async (req, res) => {
  const result = await Office.find({}).populate("uploadedBy");
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Image Retrieved Successfully",
    data: result,
  });
};

const deleteOfficeImage = async (req, res) => {
  const id = req.params.id;

  const result = await Office.findByIdAndDelete(id);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Image delete Successfully",
    data: result,
  });
};

module.exports = {
  postOfficeImages,
  getOfficeImages,
  deleteOfficeImage,
};
