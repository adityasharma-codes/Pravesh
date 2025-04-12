const router = require("express").Router();
const { signUpValidation, loginValidation } = require("../middlewares/Authvalidation.js");
const {signUp, login} = require("../controllers/AuthController.js")

router.post('/login', loginValidation, login)

router.post('/signUp', signUpValidation, signUp)


module.exports = router;