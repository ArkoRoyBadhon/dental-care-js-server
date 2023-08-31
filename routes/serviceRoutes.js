const express = require("express");
const router = express.Router();
const ServiceController = require("../src/controllers/serviceController");

router.get("/", ServiceController.getServices);
router.post("/", ServiceController.postService);
router.delete("/:id", ServiceController.deleteService);

module.exports = router;
