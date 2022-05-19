const moment = require('moment')
const Users =require('../models/user');
const Schedule = require('../models/schedule');

exports.getIndex = (req, res, next) => {
  Users.findById(req.user._id)
    .populate('quanLyId')
    .then(user =>{
      res.render('user/index', {
        user: user,
        pageTitle: 'Thông tin nhân viên',
        path: '/user',
        admin: req.user.manager.verify
      });
    })
    .catch(err=>console.log(err))   
};
exports.getCovid = (req, res, next) => {

 req.user.getCovid().then(covid =>{
  res.render('user/covid', {
    covid: covid[covid.length-1],
    pageTitle: 'Covid Infor',
    path: '/covid',
    admin: req.user.manager.verify,
    covidUser: covid,
  });
})
}
exports.getCheckin =(req,res,next)=>{
  req.user.getCheckin().then(scheduleToday =>{
    res.render('user/checkin', {
      pageTitle: 'Check In',
      path: '/checkin',
      user: req.user,
      scheduleToday: scheduleToday,
      admin: req.user.manager.verify
    });
  })
  .catch(err=> console.log(err)); 
}

exports.getNghiphep =(req,res,next)=>{
  
  res.render('user/annualLeave', {
    pageTitle: 'Nghi phep',
    path: '/nghiphep',
    user: req.user,
    today: moment().format('YYYY-MM-DD'),
    admin: req.user.manager.verify
  });
}
exports.getDate=(req,res,next)=>{
  const page = +req.query.page||1;
  const numLine = +req.query.numLine||1;
  let totalItems = 8;
  const ITEMS_PER_PAGE = numLine;//req.body.numItem;

  Schedule.findOne({'userId': req.user._id})
  .populate({
    path    : 'userId',
    populate: 'quanLyId',
 })
  // .then(schedule => {
  //   totalItems = schedule.time.length;
  //   return Schedule.findOne({'userId': req.user._id})
  // })

  .select({ 'time': { '$slice': [(page - 1) * ITEMS_PER_PAGE,ITEMS_PER_PAGE] } })
  .then(schedule =>{
    res.render('user/date-detail', {
      pageTitle: 'date-detai',
      path: '/date-detail',
      user: req.user,
      quanLy: schedule.userId.quanLyId,
      scheduleDate: null,
      schedule: schedule.time,
      admin: req.user.manager.verify,
      totalProducts: totalItems,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        page: page,
        numOfpage: ITEMS_PER_PAGE,
        phantrang:true,
        numLine: numLine,
    });
  }).catch(err=>console.log(err))
  
}
exports.getMonth=(req,res,next)=>{
  res.render('user/month', {
    pageTitle: 'Bảng lương',
    path: '/month',
    user: req.user,
    salaryUser: null,
    admin: req.user.manager.verify
  });
}
exports.postUser=(req,res,next)=>{
  //const avt = req.body.avatar;
  const image = req.file;
if(image){
  req.user.updateAvt(image).then( result=>{
    return res.redirect('/');
    })
    .catch(err => console.log(err));
}else{
  return res.redirect('/');
}
}
exports.postThannhiet=(req,res,next)=>{
  const nhietDo = req.body.nhietdo;
  console.log(nhietDo);
  req.user.kbtn(nhietDo).then(result=>{
    res.redirect('/covid');
    })
    .catch(err => console.log(err));
}
exports.postDuongtinh=(req,res,next)=>{
  req.user.duongTinh().then(result=>{
    res.redirect('/covid');
    })
    .catch(err => console.log(err));
  }
exports.postMuitiem = (req,res,next)=>{
  const ngayTiem = req.body.time;
  const loaiVaccine = req.body.vaccine;
  req.user.addMuitiem(ngayTiem,loaiVaccine).then(result=>{
    res.redirect('/covid');
    })
    .catch(err => console.log(err));
  }
exports.PostCheckin=(req,res,next)=>{
  const workplace = req.body.Workplace;
  req.user.checkIn(workplace).then(result=>{
    res.redirect('/checkin');
    })
    .catch(err => console.log(err));
  }
exports.PostNghiphep = (req,res,next)=>{
  const date = req.body.date;
  const time = req.body.time;
  const reaSon = req.body.reason;

  if(time>8|| time<0){
    return res.redirect('/nghiphep');
  }
  if (time.length *date.length*reaSon.length ===0 ){
    return res.redirect('/nghiphep');
  }

  if(req.user.annualLeave<time/8){
    return res.redirect('/nghiphep');
  }
  req.user.dangkiNghiphep(date,time,reaSon).then(result=>{
    res.redirect('/nghiphep');
    })
    .catch(err => console.log(err));
  }
  exports.postDate=(req,res,next)=>{
    const date = req.body.date;
    if(date===''){
      return res.redirect('/date-detail');
    }
    Users.findById(req.user._id)
    .populate('quanLyId')
    .then( user => {
      user.postDate(date)
      .then((scheduleDate)=> {
        res.render('user/date-detail', {
          pageTitle: 'date-detail',
          path: '/date-detail',
          quanLy: user.quanLyId,
          scheduleDate: scheduleDate,
          schedule: null,
          admin: req.user.manager.verify,
          phantrang: false,
          page:1,
        });
      })
      .catch(err=>console.log(err))
    }   
 )}
 exports.postMonth=(req,res,next)=>{
  const month = req.body.month;
  req.user.postMonth(month).then( (salaryUser)=> {
    res.render('user/month', {
      pageTitle: 'Bảng lương',
      path: '/month',
      month:month,
      user: req.user,
      salaryUser: salaryUser,
      salaryScale: req.user.salaryScale,
      admin: req.user.manager.verify,
    });
  }   
)}