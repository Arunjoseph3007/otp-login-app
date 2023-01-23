const { Schema, model } = require("mongoose");

const otpSchema = Schema(
  {
    mobileNo: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
      index: {
        expires: 300,
      },
    },
  },
  { timestamps: true }
);

module.exports.Otp = model("Otp", otpSchema);
