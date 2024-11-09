const User = require("../models/user");
const authService = require("../services/authService");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.register(email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const token = await authService.login(email, password);
  console.log(token);
  if (token) {
    res.status(200).json(token);
  } else {
    res.status(500).send({ messag: "Pu-pu-puuu" });
  }
};

// TO-DO: refactor
/*
router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res.status(400).send("User with given email already exist!");
  
      user = await new User({
        name: req.body.name,
        email: req.body.email,
      }).save();
  
      let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
  
      const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
      await sendEmail(user.email, "Verify Email", message);
  
      res.send("An Email sent to your account please verify");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  });

router.get("/verify/:id/:token", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
  
      await User.updateOne({ _id: user._id, verified: true });
      await Token.findByIdAndRemove(token._id);
  
      res.send("email verified sucessfully");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  });
*/
module.exports = { registerUser, loginUser };
