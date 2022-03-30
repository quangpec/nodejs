exports.erros =(req,res,next)=>{
    //console.log(path.join(__dirname,'views','404.html'));
    res.status(404).render('404',{pageTitle: 'errors 404', path : '/404'});
};