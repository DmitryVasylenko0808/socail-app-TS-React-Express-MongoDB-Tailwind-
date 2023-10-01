const express = require("express");
const BlackListController = require("../controllers/BlackListController");
const isAuthorized = require("../middlewares/isAuthorized");

const router = express.Router();

router.get("/", isAuthorized, BlackListController.get);
router.post("/", isAuthorized, BlackListController.add);
router.delete("/:userId", isAuthorized, BlackListController.remove);

module.exports = router;