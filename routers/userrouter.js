const express = require("express");
const router = express.Router();
const { signUp, login, getAll, updateUser, logout } = require("../controllers/onboardingcontroller");
const validation = require("../validator/vallidation");
const uploader = require("../multers/multer");
const authenticate = require("../authorization/authentication");
const {createDeposite} = require("../controllers/depositecontroller");

router.post("/sign-up",uploader.single("profilePicture"),validation,signUp);
router.post("/login",login);
router.get("/get-all",getAll);
router.put("/update/:id",authenticate,updateUser);
router.post("/logout",authenticate,logout);
router.post("/deposit",authenticate,createDeposite);

module.exports = router