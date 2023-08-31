const Service = require("../models/service");

const postService = async (req, res) => {
  console.log("SERVICE BODY", req.body);
  const result = await Service.create(req.body);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Image Retrieved Successfully",
    data: "result",
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
