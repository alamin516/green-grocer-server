const { Schema, model } = require("mongoose");



const languageSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  code: {
    type: String,
    required: true,
    maxlength: 100,
  },
  app_lang_code: {
    type: String,
    default: 'en',
    maxlength: 255,
  },
  rtl: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Language = model('Language', languageSchema);

module.exports = { Language };
