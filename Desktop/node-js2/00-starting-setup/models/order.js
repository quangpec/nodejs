const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    required: true
  },
  products:{
    idProduct: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantyly:{
      type: Number,
      required: true
    }
  }
})
module.exports =  mongoose.model('Orders',orderSchema);