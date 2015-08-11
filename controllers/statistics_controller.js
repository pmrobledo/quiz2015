var models = require('../models/models.js');

var statistics = {
	quizes: 0,
	comments: 0,
	commentsUnPublished: 0,
	commentedQuizes:0
};

var errors = [];

exports.calculate = function(req, res, next){

	models.Quiz.count()
	.then(function (numQuizes){ //Número de preguntas
		statistics.quizes = numQuizes;
		return models.Comment.count();
	})
	.then(function (numComments){ //Número de comentarios
		statistics.comments = numComments;
		return models.Comment.countUnPublished();
	})
	.then(function (numUnPublished){ // Número de comentarios sin publicar
		statistics.commentsUnPublished = numUnPublished;
		return models.Comment.countCommentQuizes();
	})
	.then(function (numCommentQuizes){ //Número de preguntas con comentarios
		statistics.commentedQuizes = numCommentQuizes;
	})
	.catch(function (err) { errors.push(err); })
	.finally(function (){
		next();
	});
};

//GET /quizes/statistics
exports.show = function(req, res) {
	res.render('statistics/show', {statistics: statistics, errors: errors });
};
