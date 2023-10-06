const Appointment = require("../models/Appointment");
const Office = require("../models/Office");
const User = require("../models/User");

const postAppointment = async (req, res) => {
  try {
    const userData = await User.find({ email: req.body?.patientId });
    // console.log("User", userData);
    const appointmentData = {
      name: userData && userData[0]?.name,
      appointmentDate: req.body?.appointmentDate,
      service: req.body?.service,
      patientEmail: req.body?.patientId,
    };

    const findAppoint = await Appointment.find({
      appointmentDate: req.body?.appointmentDate,
    });
    console.log(findAppoint.length);

    if (findAppoint.length < 10) {
      const result = await Appointment.create(appointmentData);
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Appointment Created Successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Appointment Limit Crossed",
        data: "Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error,
    });
  }
};
// availableSeat
const getAppointmentSeat = async (req, res) => {
  const seatForDate = req.params?.date;
  const result = await Appointment.find({ appointmentDate: seatForDate });
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Appointment seat Retrieved Successfully",
    data: result,
  });
};

const getAllAppointmentSingleDate = async (req, res) => {
  try {
    const dateStr = req.query.date;
    const parsedDate = Date.parse(dateStr);

    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format");
    }

    const dateObject = new Date(parsedDate);
    const formattedDate = dateObject.toISOString().split("T")[0];

    const result = await Appointment.find({
      appointmentDate: {
        $gte: formattedDate,
        $lt: new Date(formattedDate + "T23:59:59.999Z"),
      },
    });

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Appointment data Retrieved Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      success: false,
      message: "Invalid date format",
    });
  }
};

// const getAllAppointmentSingleDate = async (req, res) => {
// //   console.log("ss", new Date(req.query.date));
//   const dateObject = new Date(req.query.date);
//   const formattedDate = dateObject.toISOString().split("T")[0];

//   const result = await Appointment.find({
//     appointmentDate: {
//       $gte: formattedDate,
//       $lt: new Date(formattedDate + "T23:59:59.999Z"),
//     },
//   });
//   res.status(200).json({
//     statusCode: 200,
//     success: true,
//     message: "Appointment data Retrieved Successfully",
//     data: result,
//   });
// };

const getAppointmentWithEmail = async (req, res) => {
  const email = req.params.email;

  const result = await Appointment.find({
    patientEmail: email,
  });

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Appointment Retrieved Successfully",
    data: result,
  });
};

const deleteAppointment = async (req, res) => {
  const id = req.params.id;
  const { email } = req.query;

  console.log(id);
  console.log(email);

  const isAdmin = await User.find({
    email: email,
  });

  console.log("isAdmin", isAdmin && isAdmin[0]?.role);

  const isOwner = await Appointment.find({
    _id: id,
  });

  if (isOwner) {
    if (isOwner[0]?.patientEmail === email) {
      const result = await Appointment.findByIdAndDelete({ _id: id });
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Appointment delete Successfully",
        data: result,
      });
    } else if (isAdmin) {
      const result = await Appointment.findByIdAndDelete({ _id: id });
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Appointment delete Successfully",
        data: "result",
      });
    } else {
      res.status(500).json({
        statusCode: 500,
        success: failed,
        message: "Appointment deletion failed",
        data: "result",
      });
    }
  }
};

module.exports = {
  postAppointment,
  getAppointmentSeat,
  getAllAppointmentSingleDate,
  getAppointmentWithEmail,
  deleteAppointment,
};
