const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('625e25073ad72c8e752f34ea')
    .then(user => {
      req.user = user;//new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

//app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404);

mongoose.connect(
  'mongodb+srv://quangla:QebHHAW06xWVA0pC@cluster.ghciv.mongodb.net/asm1?retryWrites=true&w=majority'
).then(result => {
  User.findOne()
    .then(user => {
      if (!user) {
        const user = new User({
          name: 'Admin',
          doB: '01/01/1990',
          salaryScale: 1.1,
          startDate:'01/01/2021',
          department: 'Nhân sự',
          annualLeave: 12,
          avatar: 'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
          status: false,
        })
        user.save();
        return ;
      }
      })
    .catch(err=> console.log(err))})
  .then(result => {
      app.listen('3000')
   })
  .catch(err => console.log(err))
