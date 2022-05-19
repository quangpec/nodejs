const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const xacnhanSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    month: {
        type: String,
        required: true,
    }
})
  
module.exports = mongoose.model('Xacnhan', xacnhanSchema);