const express = require("express");
const router = express.Router();
const ScheduleController = require("../src/controllers/phoneTimeController");

router.get("/", ScheduleController.getSchedule);
router.post("/", ScheduleController.postSchedule);
router.patch("/:id", ScheduleController.updateSchedule);
router.delete("/:id", ScheduleController.deleteSchedule);

module.exports = router;
