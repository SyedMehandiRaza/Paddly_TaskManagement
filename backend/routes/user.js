const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/sign-in", async (req, res) => {
  
    try {
        const { username, email } = req.body;

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
          return res.status(400).json({ message: "Username already exists" });
        }

        if (username.length < 4) {
          return res.status(400).json({ message: "Username should have at least 4 characters" });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
        }

        const hashPass= await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPass,
        })
      await newUser.save();
      return res.status(200).json({ message: "SignIn successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});


router.post("/log-in", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username: username });
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  bcrypt.compare(password, existingUser.password, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error while verifying password" });
    }

    if (data) {
      const authClaims = [{name:username},{jti:jwt.sign({},"smTM") }];
      // const token = jwt.sign({ authClaims }, "smTM", {
      //   expiresIn: "2d", 
      // });
      const token = jwt.sign({ id: existingUser._id, username }, "smTM", { expiresIn: "2d" });

      res.status(200).json({id: existingUser._id, token: token})
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  });
});


module.exports = router;
