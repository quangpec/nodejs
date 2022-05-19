const mongoose = require('mongoose');
const Covid = require('../models/covid');
const Schedule = require('../models/schedule');
const fileHelper = require('../util/file');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required:true
  },
  doB: {
    type: Date,
    required: true
  },
  salaryScale:{
    type: Number,
    required: true
  },
  startDate:{
    type: Date,
    required: true
  },
  department:{
    type: String,
    required: true
  },
  annualLeave:{
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  manager:{
    verify:{
      type: Boolean,
      required: true
    },
    UserId:[
      {
       type: Schema.Types.ObjectId,
        required: false,
        ref: 'Users'

      }
    ]},
    quanLyId:{
      type: Schema.Types.ObjectId,
        required: false,
        ref: 'Users'
    }
})
userSchema.methods.getCovid = function(product) {
  const userid = this.manager.UserId;
  userid.push(this._id);
return Covid
 .find({'userId': {$in: userid}})
 .populate('userId','name avatar')
 .then( covid =>{
   if (covid.length===0)
   {
    const userCovid = new Covid({
      userId: this._id,
      vaccine: [],
      thanNhiet: [],
      duongTinh: 'Âm tính'
    })
    userCovid.save();
    return userCovid;
   }
   else{
     return covid;
    };
   
 })
}
userSchema.methods.updateAvt = function(image){
fileHelper.deleteFile(this.avatar);
 this.avatar = image.path;
 return this.save();
}
userSchema.methods.kbtn = function(nhietdo){
 return  Covid.findOne({'userId':this._id})
  .then( covid =>{
    const thanNhiet = covid.thanNhiet;
    thanNhiet.push({
      nhietDo: nhietdo,
      time: new Date()
    })
    covid.thanNhiet= thanNhiet;
    return covid.save();
  })
}
userSchema.methods.duongTinh= function(){
  return  Covid.findOne({'userId':this._id})
  .then( covid =>{
    if(covid.duongTinh==='Âm tính'){
      covid.duongTinh='Dương tính';
    }else{
      covid.duongTinh='Âm tính';
    }
    return covid.save();
  })
}
userSchema.methods.addMuitiem = function(ngaytiem,loaiVaccine){
  return  Covid.findOne({'userId':this._id})
  .then( covid =>{
    const vaccine = covid.vaccine;
    vaccine.push({
      ngaytiem:ngaytiem,
      loaiVaccine:loaiVaccine
    })
    covid.vaccine = vaccine;
    return covid.save();
  })

}
userSchema.methods.checkIn = function(workPlaceUser){
return Schedule.findOne({'userId':this._id}).then(scheduleUser =>{
      if (scheduleUser===null){
        scheduleUser = new Schedule({
          userId: this._id,
          time: [],
          nghiPhep: [],
        })
      }

      if (this.status ===false){
      const time = scheduleUser.time;
      time.push({
        timeStart: new Date(),
        workPlace: workPlaceUser,
        timeEnd:null,
      })
      scheduleUser.time = time; 
    } else{
      scheduleUser.time[scheduleUser.time.length-1].timeEnd = new Date();
    }
    this.status = !this.status;
    this.save();
    return scheduleUser.save();
})
}
userSchema.methods.getCheckin = function(){
  let gioLam =0;
 return Schedule.findOne({'userId':this._id}).then(scheduleUser =>{
    if(scheduleUser ===null){
      return null;
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // if(scheduleUser.time[scheduleUser.time.length-1].timeEnd===null){
    //   const endDay = scheduleUser.time[scheduleUser.time.length-1].timeStart;
    //   const endDayDate = new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate());
    //   if(today !== endDayDate){
    //     this.status=false;
    //     this.save();
    //     return null;
    //   }
    // }
    const  scheduleToday= scheduleUser.time.filter(t => t.timeStart>=today);
    for(let i = 0;i<scheduleToday.length;i++){
      gioLam= scheduleToday[i].timeEnd-scheduleToday[i].timeStart+gioLam;
    }
    gioLam = gioLam/60/60/1000;
    gioLam = gioLam.toFixed(2);
    console.log(scheduleToday);
    // if(scheduleToday.length()===0){
    //    this.status=false;
    //    this.save();
    //    scheduleUser.time[scheduleUser.time.length-1] =[];
    //    scheduleUser.save();
    //   return null
    // }
    scheduleToday.gioLam =gioLam;
    
    return scheduleToday
  })
}
userSchema.methods.dangkiNghiphep = function(date,time,reaSon){
  return Schedule.findOne({'userId':this._id}).then(scheduleUser =>{
    if (scheduleUser===null){
      scheduleUser = new Schedule({
        userId: this._id,
        time: [],
        nghiPhep: [],
      })
    }
    const nghiPhep = scheduleUser.nghiPhep;
    nghiPhep.push({
      time: time,
      date: new Date(date),
      reason:reaSon
    })
    scheduleUser.nghiPhep = nghiPhep;
    scheduleUser.save();
    this.annualLeave = this.annualLeave-time/8;
    return this.save();
})
  }

userSchema.methods.postDate = function(date){
  return Schedule.findOne({'userId':this._id})
  .then(scheduleUser =>{
    if(scheduleUser ===null){
      return null;
    }
    const day = new Date(date);
    const dayStart = new Date(date);
    let dayEnd = day.setTime(day.getTime() + 86400000);
    dayEnd = new Date(dayEnd);
    let gioLam = 0;
    let giolamThem = 0;
    const  scheduleDate= scheduleUser.time.filter(t => t.timeStart>=dayStart && t.timeStart<dayEnd);
    const  annualLeavedate= scheduleUser.nghiPhep.filter(p => p.date.valueOf()===dayStart.valueOf());
    // console.log('++++++++',scheduleUser.nghiPhep[1].date.valueOf());
    let annualLeave =0;
    for( let i =0; i<annualLeavedate.length;i++){
      annualLeave = annualLeave+annualLeavedate[i].time;
    }

    for( let i =0; i<scheduleDate.length;i++){
      if(scheduleDate[i].timeEnd!==null){
      gioLam = gioLam+ scheduleDate[i].timeEnd.valueOf() - scheduleDate[i].timeStart.valueOf();
      }
    }
    gioLam = gioLam/60/60/1000;
    //gioLam = gioLam.toFixed(2);
    if(gioLam>8){
      giolamThem = gioLam-8;
    }
    scheduleDate.schedule=scheduleDate;
    const tongGio = annualLeave+gioLam;
    scheduleDate.tongGio = tongGio;
    scheduleDate.giolamThem = giolamThem;
    scheduleDate.gioLam = gioLam;
    scheduleDate.annualLeave= annualLeave;
    scheduleDate.date = dayStart;

    return scheduleDate
})
}
userSchema.methods.postMonth = function(month){
  
  return Schedule.findOne({'userId':this._id}).then(scheduleUser =>{
    if(scheduleUser ===null){
      return null;
    }
    const year = month.split('-')[0];
    const thang = month.split('-')[1];
    const date = new Date(Number(year), Number(thang)-1,2);
    const  scheduleDate= scheduleUser.time.filter(t => t.timeStart.getFullYear()===date.getFullYear() &&  t.timeStart.getMonth()===date.getMonth());
    if (scheduleDate.length===0){
      return null
    }
    const minDate = scheduleDate[0].timeStart.getDate();
    const maxDate = scheduleDate[scheduleDate.length-1].timeStart.getDate();
    let index =0;
    let dateWork =[];
    for( let i= minDate; i<=maxDate;i++){
      console.log(i,scheduleDate.filter(t => t.timeStart.getDate() ===i));
      dateWork[index] = scheduleDate.filter(t => t.timeStart.getDate() ===i);
      if(dateWork[index].length !== 0){
        index = index+1;
      }
    }
    let gioLam =[];
    for( let i= 0; i<dateWork.length;i++){
        gioLam[i]=0;
        for(let j = 0;j<dateWork[i].length;j++){
          gioLam[i]= gioLam[i] + dateWork[i][j].timeEnd.valueOf() - dateWork[i][j].timeStart.valueOf();
        }
        gioLam[i] = gioLam[i]/60/60/1000;
    }
    console.log('___________________',dateWork);
    for( let i= 0; i<dateWork.length;i++){
    const dateNotime = new Date( Date.UTC(dateWork[i][0].timeStart.getFullYear(),dateWork[i][0].timeStart.getMonth(),dateWork[i][0].timeStart.getDate(),0,0,0));
    console.log('___________________',dateNotime);
     const annualLeavedate = scheduleUser.nghiPhep.filter(p => p.date.valueOf()===dateNotime.valueOf());
     console.log(annualLeavedate);
     let annualLeave =0;
    for( let j =0; j<annualLeavedate.length;j++){
      annualLeave = annualLeave+annualLeavedate[j].time;
    }
    gioLam[i] = gioLam[i]+annualLeave;
    }
    console.log(gioLam);
    let gioLamthem =[];
    let gioLamthieu =[];
    for ( let i = 0 ; i<gioLam.length;i++){
      gioLamthem[i] =0;
      gioLamthieu[i]=0;
      if (gioLam[i]>8){
        gioLamthem[i] = gioLam[i] -8;
      }
      if (gioLam[i]<8){
        gioLamthieu[i] = 8-gioLam[i];
      }
    }
    let tongGiolamThem = 0;
    let tonggiolamThieu = 0;
    for(let i =0;i<gioLam.length;i++){
     tongGiolamThem =tongGiolamThem + gioLamthem[i];
    tonggiolamThieu = tonggiolamThieu+gioLamthieu[i];
    }
    let luong = this.salaryScale*3000000+(tongGiolamThem-tonggiolamThieu)* 200000/8;
    console.log(luong);
    const salaryUser =[];
    salaryUser.luong = luong;
    salaryUser.overTime =tongGiolamThem;
    salaryUser.tonggiolamThieu = tonggiolamThieu;
    return salaryUser;
  })

}
module.exports =  mongoose.model('Users',userSchema);








































// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }
//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }
//   addTocart(idProduct){
//     
//   getCart(){
//     const db= getDb();
//     const productIds = this.cart.map(i => {
//       return i.productId;
//     });

//     return db
//     .collection('products')
//     .find({ _id: { $in: productIds } })
//     .toArray()
//     .then(products =>{
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       })
//     .catch(err => console.log(err))
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//    deleteById(idProduct){
//     const updatedCartItems = this.cart.filter(item => {
//       //console.log('_________________',item.productId.toString());
//       return item.productId.toString()!==idProduct
//     });
//     const db = getDb();
//     return db
//     .collection('users').updateOne(
//       {_id: new mongodb.ObjectId(this._id)},
//       { $set: { cart: updatedCartItems }}
//     )
//     .then(()=> {
//       console.log('delete product');
//     })
//     .catch(err=> console.log(err));
    
//   }
//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = [];
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart:[] } }
//           );
//       });
//   }
//   getOrders(){
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({'user._id': new ObjectId(this._id)})
//       .toArray()
//       .then(orders => {
//         console.log(orders);
//         return orders;
//       })
//       .catch(err => {
//         console.log(err);
//       });


//   }
// }

// module.exports = User;
