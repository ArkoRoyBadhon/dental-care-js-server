const PhoneTime = require("../models/PhoneTime");
const Service = require("../models/service");

const postSchedule = async (req, res) => {
  //   console.log("schedule", req.body);
  const ExistSchedule = await PhoneTime.find({});
  if (ExistSchedule && ExistSchedule.length > 0) {
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Schedule already existed and only you can update it!",
    });
  } else {
    const result = await PhoneTime.create(req.body);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Schedule created Successfully",
      data: result,
    });
  }
};

const getSchedule = async (req, res) => {
  const result = await PhoneTime.find({});
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Schedule Retrieved Successfully",
    data: result,
  });
};

const updateSchedule = async (req, res) => {
  const id = req.params.id;
  const bodyData = req.body;

//   console.log("update info",req.body);

  const result = await PhoneTime.findByIdAndUpdate(
    {
      _id: id,
    },
    bodyData,
    {
      new: true,
    }
  );
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Schedule updated Successfully",
    data: result,
  });
};

const deleteSchedule = async (req, res) => {
  const id = req.params.id;

  const result = await PhoneTime.findByIdAndDelete(id);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Schedule Deleted Successfully",
    data: result,
  });
};

module.exports = {
  postSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
