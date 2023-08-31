const express = require("express");
const router = express.Router();
const OfficeController = require("../src/controllers/officeController");

router.get("/", OfficeController.getOfficeImages);
router.post("/", OfficeController.postOfficeImages);
router.delete("/:id", OfficeController.deleteOfficeImage);

module.exports = router;
