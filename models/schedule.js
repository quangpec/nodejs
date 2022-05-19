const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
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
    nghiPhep:[{
         date: {
             type: Date,
         },
         time:{
            type:Number,
         },
         reaSon:{
             type: String,
         }
        }]

})
  
module.exports = mongoose.model('Schedule', scheduleSchema);
