const fs = require('fs');
const path = require('path');
const PDFdocument = require('pdfkit');
const Covid = require('../models/covid');
const Users = require('../models/user');
const Schedule = require('../models/schedule');
const Xacnhan = require('../models/xacnhan');
//const { validationResult } = require('express-validator');
exports.getManager = (req, res, next) => {
  const userId = req.user._id;
  Users.findById(userId)
    .populate('manager.UserId')
    .then(user => {
      res.render('admin/manager', {
        path: '/manager',
        pageTitle: 'manager',
        admin: true,
        users: user.manager.UserId,
        validationErrors: [],
        errorMessage: null
      });
    }
    ).catch(err => console.log(err))
}
exports.postAdduser = (req, res, next) => {
  const mailUser = req.body.email;
  Users.find({ email: mailUser }).then(user => {
    if (user.length === 0) {
      console.log('địa chỉ email không tìm thấy');
      const userId = req.user._id;
      return Users.findById(userId)
        .populate('manager.UserId')
        .then(user => {
          return res.render('admin/manager', {
            path: '/manager',
            pageTitle: 'manager',
            admin: true,
            users: user.manager.UserId,
            validationErrors: [],
            errorMessage: 'địa chỉ email không tìm thấy'
          });
        })
    }
    if (user[0]._id.toString() === req.user._id.toString()) {
      console.log('không thể thêm chính mình');
      const userId = req.user._id;
      return Users.findById(userId)
        .populate('manager.UserId')
        .then(user => {
          return res.render('admin/manager', {
            path: '/manager',
            pageTitle: 'manager',
            admin: true,
            users: user.manager.UserId,
            validationErrors: [],
            errorMessage: 'không thể thêm chính mình'
          });
        })
    }
    const checkUser = req.user.manager.UserId.filter(UserId => UserId.toString() === user[0]._id.toString());
    if (checkUser.length > 0) {
      console.log('đã có trong danh sách quản lý')
      return res.redirect('./manager')
    }
    req.user.manager.UserId.push(user[0]._id);
    req.user.save();
    res.redirect('./manager')
  }).catch(err => console.log(err))
}
exports.postUser = (req, res, next) => {
  const userId = req.params.userId;
  Users.findById(userId).then(user => {
    console.log(user._id);
    res.render('admin/user', {
      path: '/user',
      pageTitle: 'user',
      admin: true,
      user: user,
      validationErrors: [],
    })
  }
  ).catch(err => console.log(err))
}
exports.editUser = (req, res, next) => {
  const userId = req.params.id;
  const name = req.body.name;
  const annualLeave = req.body.annualLeave;
  const department = req.body.department;
  const salaryScale = req.body.salaryScale;
  Users.findById(userId).then(user => {
    user.name = name;
    user.annualLeave = annualLeave;
    user.department = department;
    user.salaryScale = salaryScale;
    user.save();
    res.redirect('../manager');

  })
    .catch(err => console.log(err));
}
exports.covidId = (req, res, next) => {
  const covidId = req.params.id;

  Covid.findById(covidId)
    .populate('userId', 'name email')
    .then(covid => {
      //console.log(req.user.manager.UserId.filter(id => id.toString() ===covid.userId._id.toString()).length===0)
      if (req.user.manager.UserId.filter(id => id.toString() === covid.userId._id.toString()).length === 0) {
        return res.redirect('/covid');
      }

      const covidName = 'covid-' + covid.userId._id + '.pdf';
      const covidPath = path.join('data', 'covid', covidName);
      const pdfDoc = new PDFdocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Dispositon', 'inline; filename="' + covidName + '"');
      pdfDoc.pipe(fs.createWriteStream(covidPath, 'UTF-8'));
      pdfDoc.pipe(res);
      pdfDoc
        .fontSize(14)
        .font('Helvetica')
        .text('ID user: - ' + covid.userId._id);
      pdfDoc
        .font('Helvetica')
        .text('Name: - ' + covid.userId.name, { EndCoder: 'UTF-8' });
      pdfDoc
        .text('Email: - ' + covid.userId.email);
      pdfDoc
        .text(' ket qua Xet nghiem moi nhat: ' + covid.duongTinh);

      pdfDoc.text('----------------------------------')
      pdfDoc.text('Thong tin than nhiet')
      covid.thanNhiet.forEach(t => {
        pdfDoc.text('Nhiet do:  ' + t.nhietDo + ' --- ' + t.time.toLocaleString());
      })
      pdfDoc.text('----------------------------------')
      pdfDoc.text('Vaccin');
      covid.vaccine.forEach((t, index) => {
        pdfDoc.text('mui tiem lan ' + (index + 1) + '  ' + t.loaiVaccine + ' --- ' + t.ngaytiem.toLocaleString());
      })

      pdfDoc.end();
    })
    .catch(err => {

      console.log(err)
      res.redirect('/covid');
    }
    )
}
exports.getchamCong = (req, res, next) => {
  const userId = req.params.id;
  res.render('admin/chamcong', {
    path: '/user',
    pageTitle: 'user',
    admin: true,
    validationErrors: [],
    userId: userId,
    scheduleUser: null
  })
}
exports.postListdiemdanh = (req, res, next) => {
  const userId = req.params.id;
  const month = req.body.month;
  let xn = false;
  Xacnhan.findOne({
    userId: userId,
    month: month
  })
  .then(xacnhan => {
    console.log(xacnhan);
    if(xacnhan){
      console.log(xacnhan);
       xn= true;
    }
    const year = month.split('-')[0];
    const thang = +month.split('-')[1] - 1;
    const date = new Date(Number(year), Number(thang), 2);
    Schedule.findOne({ 'userId': userId }).then(scheduleUser => {
      let scheduleDate;
      if (scheduleUser) {
        scheduleDate = scheduleUser.time.filter(t => t.timeStart.getFullYear() === date.getFullYear() && t.timeStart.getMonth() === date.getMonth());
      }
      else {
        scheduleDate = null;
      }
      res.render('admin/chamcong', {
        path: '/user',
        pageTitle: 'Xác nhận giờ làm',
        admin: true,
        validationErrors: [],
        userId: userId,
        scheduleUser: scheduleDate,
        month: month,
        xn: xn,
      })

    })
  })
   .catch(err => console.log(err))
  }
exports.postDelete = async (req, res, next) => {
      const userId = req.body.userId;
      const scheduleID = req.body.scheduleID;
      const schedule = await Schedule.findOne({ 'userId': userId })
      const newTime = schedule.time.filter(t => t._id.toString() !== scheduleID);
      await Schedule.updateOne({ userId }, {
        time: newTime
      });
      res.redirect('./' + userId);
    }
exports.postXacnhan = (req, res, next) => {

      const month = req.body.month;
      const userId = req.body.userId;
      const newXacnhan = new Xacnhan({
        userId: userId,
        month: month,
      });
      newXacnhan.save();
      res.redirect('./' + userId);

    }