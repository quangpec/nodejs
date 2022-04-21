
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
    console.log(scheduleToday.gioLam);
    res.render('user/checkin', {
      pageTitle: 'Check In',
      path: '/checkin',
      user: req.user,
      scheduleToday: scheduleToday
    });
  })
  .catch(err=> console.log(err)); 
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