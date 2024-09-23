const bcryptjs = require("bcryptjs");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "User name should be minimum 3 characters"],
    maxlength: [31, "User name should be maximum 31 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
        validator: function(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minlength: [8, "User password should be minimum 8 characters"],
    set: (v) => bcryptjs.hashSync(v, 10),
  },
  role: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    validate: {
      validator: function(phone) {
        // Example regex for validating US phone numbers
        // return /^(?:\+?1[-.●]?|[1-9]\d?)?\(?\d{3}\)?[-.●]?\d{3}[-.●]?\d{4}$/.test(phone); 

        // General regex for validating international phone numbers
        // return /^\+?[1-9]\d{1,14}$/.test(phone);

        // Regex for validating Bangladeshi phone numbers
        return /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/.test(phone);
    },
    message: 'Please enter a valid Bangladeshi phone number.'
    },
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  
}, {timestamps: true});


const User = model("User", userSchema);

module.exports = User;
