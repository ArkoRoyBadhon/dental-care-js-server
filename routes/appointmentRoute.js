const express = require("express");
const router = express.Router();
const AppointmentController = require("../src/controllers/appointmentController");

router.post("/", AppointmentController.postAppointment);
router.get("/appointseat", AppointmentController.getAppointmentSeat);
router.get("/", AppointmentController.getAllAppointmentSingleDate);
router.get("/:email", AppointmentController.getAppointmentWithEmail);
// router.post("/", OfficeController.postOfficeImages);
router.delete("/:id", AppointmentController.deleteAppointment);

module.exports = router;
