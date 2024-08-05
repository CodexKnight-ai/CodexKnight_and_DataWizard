import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
      match: [/^\d{10}$/, 'Please fill a valid phone number'],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    tokens:[
      {
        token:{
          type:String,
          required:true
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10); // Encrypting password
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Checking password with the original one
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    this.tokens = this.tokens.concat({ token:token });
    await this.save();

    return token;
  } catch (error) {
    console.error('Error generating auth token:', error);
    throw new Error('Could not generate auth token');
  }
};




// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id.toString(),
//       email: this.email,
//       username: this.username,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

export const User = mongoose.model("User", userSchema);
