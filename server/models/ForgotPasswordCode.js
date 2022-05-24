import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ForgotPasswordCodeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

ForgotPasswordCodeSchema.pre("save", function (next) {
  this.code = bcrypt.hashSync(this.code, bcrypt.genSaltSync(10));
  next();
});

ForgotPasswordCodeSchema.methods.compareCode = function (code) {
  return bcrypt.compareSync(code, this.code);
};

export default mongoose.model("ForgotPasswordCode", ForgotPasswordCodeSchema);
