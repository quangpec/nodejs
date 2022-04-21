const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const covidSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
      },
      vaccine:[{
          ngaytiem: {
              type: Date,
              required: true
          },
          loaiVaccine:{
              type: String,
              required: true
          }
      }],
      thanNhiet:[{
          nhietDo: {
              type: Number,
              required: true
          },
          time: {
              type: Date,
              required: true
          }
      }],
      duongTinh:{
          type: String,
          required: true
      }
})
module.exports =  mongoose.model('Covid',covidSchema);