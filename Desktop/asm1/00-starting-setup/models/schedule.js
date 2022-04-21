const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
    time: [{
        workPlace:{
            type: String,
        },
        timeStart:{
            type: Date,
        },
        timeEnd:{
            type: Date,
        }
    }],
    nghiPhep:[
        {
            type:Date
        }
    ]

})
  
module.exports = mongoose.model('Schedule', scheduleSchema);
