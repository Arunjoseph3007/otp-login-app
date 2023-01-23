const router = require("express").Router();
const { User } = require("../model/user.model");
const { Otp } = require("../model/otp.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { mobileNo } = req.body;
  try {
    const user = await User.findOne({ mobileNo }).exec();

    if (user) return res.status(400).json({ message: "User already exists" });

    const newOtp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log(newOtp);

    const newUser = await new User({ mobileNo }).save();
    const salt = await bcrypt.genSalt(10);
    const otp = await bcrypt.hash(newOtp, salt);
    const otpRecord = await new Otp({ otp, mobileNo }).save();

    return res
      .status(200)
      .json({ message: `OTP send to ${mobileNo}`, otpRecord, newUser });
  } catch (error) {
    return res.status(400).json({ message: `Something went wrong`, error });
  }
});

router.post("/verifyOtp", async (req, res) => {
  const { mobileNo, otp } = req.body;
  try {
    const otpRecord = await Otp.findOne({ mobileNo }).exec();
    const validUser = await bcrypt.compare(otp, otpRecord.otp);

    if (!otpRecord || !validUser) {
      return res.status(400).json({ message: `Auth failed` });
    }

    await Otp.deleteMany({ mobileNo }).exec();

    return res.status(200).json({ message: "Auth succesfull" });
  } catch (error) {
    return res.status(400).json({ message: `Something went wrong`, error });
  }
});

router.post("/login", async (req, res) => {
  const { mobileNo } = req.body;
  try {
    const userRecord = await User.findOne({ mobileNo }).exec();

    if (!userRecord) return res.status(400).json({ message: "No user found" });

    await Otp.deleteMany({ mobileNo }).exec();

    const newOtp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log(newOtp);

    const salt = await bcrypt.genSalt(10);
    const otp = await bcrypt.hash(newOtp, salt);

    const otpRecord = await new Otp({ otp, mobileNo }).save();

    return res.status(200).json({ message: `OTP send to ${mobileNo}` });
  } catch (error) {
    return res.status(400).json({ message: `Something went wrong`, error });
  }
});

module.exports = router;
