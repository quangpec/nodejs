const mongoose = require('mongoose');
const Covid = require('../models/covid');
const Schedule = require('../models/schedule');
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
  }
})
userSchema.methods.getCovid = function(product) {
return Covid
 .find({'userId':this._id})
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
     return covid[0];
    };
   
 })
}
userSchema.methods.updateAvt = function(avt){
 this.avatar = avt;
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
 return Schedule.findOne({'userId':this._id}).then(scheduleUser =>{
    if(scheduleUser ===null){
      return null;
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const  scheduleToday= scheduleUser.time.filter(t => t.timeStart>=today);
    let gioLam =0;
    for(let i = 0;i<scheduleToday.length;i++){
      gioLam= scheduleToday[i].timeEnd-scheduleToday[i].timeStart+gioLam;
    }
    gioLam = gioLam/60/60/1000;
    gioLam = gioLam.toFixed(2);
    scheduleToday.gioLam =gioLam;
    return scheduleToday
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
