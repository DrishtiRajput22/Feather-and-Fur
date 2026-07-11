const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
    res.send("Feather & Fur Backend is Running ");
});
module.exports = router;