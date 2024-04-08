const mongoose = require('mongoose');
const validator = require('validator');
const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Contact info should contain email']
    },
    message: {
      type: String,
      require: [true, 'Contact form must have a message']
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
