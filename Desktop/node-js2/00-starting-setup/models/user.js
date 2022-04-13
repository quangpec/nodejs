const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  addTocart(idProduct){
    const updateCart = {items:[{productId:idProduct,quantity: 1}]};

    const db = getDb();
    return db
    .collection('users')
    .updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updateCart } }
    );

  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
