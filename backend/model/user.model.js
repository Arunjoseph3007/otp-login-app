const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    mobileNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      number: this.number,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports.User = model("User", userSchema);
