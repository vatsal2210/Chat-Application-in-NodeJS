module.exports = function(appContext) {

	var app = appContext.app;

	app.get('/index', function(req,res){		
		res.render('index.ejs');
	});




};