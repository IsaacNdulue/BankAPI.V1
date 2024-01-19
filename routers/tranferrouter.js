const express = require("express");
const router = express.Router();

const { makeTransfer, makewithdraw, utilispay, betpayment }= require("../controllers/transfercontroller");
const { history } = require("../controllers/histroycontroller");

const authenticate = require("../authorization/authentication");

router.post("/transfer",authenticate,makeTransfer);
router.post("/withdraw",authenticate,makewithdraw);
router.post("/utilis",authenticate, utilispay);
router.get("/history",authenticate, history);
router.post("/betpayment",authenticate,betpayment);

module.exports = router

