'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ObjectId = mongoose.Schema.Types.ObjectId;

var ClassifiedSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  address: {
    country: String,
    city: String
  },
  contact: {
    name: String,
    mail: String,
    phone: String
  },
  images: [
    {
      data: Buffer,
      contentType: String
    }
  ],
  startDate: {
    type: Date,
    default: Date.now
  },
  owner: ObjectId,
  active: Boolean
});

export default mongoose.model('Classified', ClassifiedSchema);
