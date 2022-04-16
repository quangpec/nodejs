const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items:[{
      productID: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true

      },
      quantily: {
        type: Number,
        required: true
      }

  }]
  },
})
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
//     const updatedCartItems = [...this.cart];
//     const  itemsIndex = this.cart.findIndex(item =>item.productId.toString() === idProduct)
//     if (itemsIndex>=0){
//       updatedCartItems[itemsIndex].quantity = updatedCartItems[itemsIndex].quantity+1;
//     }
//     else{
//       updatedCartItems.push({
//         productId: new ObjectId(idProduct),
//         quantity: 1
//       });
//     }
//     //const updateCart = {items:[{productId: new ObjectId(idProduct),quantity: 1}]};

//     const db = getDb();
//     return db
//     .collection('users')
//     .updateOne(
//       { _id: new ObjectId(this._id) },
//       { $set: { cart: updatedCartItems } }
//     );

//   } 
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
