const express = require('express');
const router=express.Router();
const { home, contact } = require("../controller/auth-controller");
router.route("/").get(home);
router.route("/contact").post(contact);
module.exports=router