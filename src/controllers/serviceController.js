const User = require("../models/User");
const Service = require("../models/service");

const postService = async (req, res) => {
  const userData = await User.find({ email: req.body.uploadedEmail });

  const dataInfo = {
    title: req.body?.title,
    image: req.body?.image,
    uploadedBy: userData && userData[0]?._id,
  };
  const result = await Service.create(dataInfo);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Image posted Successfully",
    // data: "result",
    data: result,
  });
};

const getServices = async (req, res) => {
  const result = await Service.find({}).populate("uploadedBy");
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Image Retrieved Successfully",
    data: result,
  });
};

const deleteService = async (req, res) => {
  const id = req.params.id;

  const result = await Service.findByIdAndDelete(id);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Image Retrieved Successfully",
    data: result,
  });
};

module.exports = {
  postService,
  getServices,
  deleteService,
};
