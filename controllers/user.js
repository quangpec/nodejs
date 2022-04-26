
exports.getIndex = (req, res, next) => {
      res.render('user/index', {
        user: req.user,
        pageTitle: 'Thông tin nhân viên',
        path: '/user'
      });
};
exports.getCovid = (req, res, next) => {
 req.user.getCovid().then(covid =>{
  res.render('user/covid', {
    covid: covid,
    pageTitle: 'Covid Infor',
    path: '/covid'
  });
})
}
exports.getCheckin =(req,res,next)=>{
  req.user.getCheckin().then(scheduleToday =>{
    res.render('user/checkin', {
      pageTitle: 'Check In',
      path: '/checkin',
      user: req.user,
      scheduleToday: scheduleToday
    });
  })
  .catch(err=> console.log(err)); 
}

exports.getNghiphep =(req,res,next)=>{
  res.render('user/annualLeave', {
    pageTitle: 'Nghi phep',
    path: '/nghiphep',
    user: req.user,
  });
}
exports.getDate=(req,res,next)=>{
  res.render('user/date-detail', {
    pageTitle: 'date-detail',
    path: '/date-detail',
    user: req.user,
    scheduleDate: null
  });
}
exports.getMonth=(req,res,next)=>{
  res.render('user/month', {
    pageTitle: 'Bảng lương',
    path: '/month',
    user: req.user,
    salaryUser: null
  });
}
exports.postUser=(req,res,next)=>{
  const avt = req.body.avatar;
  req.user.updateAvt(avt).then( result=>{
    res.redirect('/');
    })
    .catch(err => console.log(err));
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
    req.user.postDate(date).then( (scheduleDate)=> {
      res.render('user/date-detail', {
        pageTitle: 'date-detail',
        path: '/date-detail',
        user: req.user,
        scheduleDate: scheduleDate
      });
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
    });
  }   
)}